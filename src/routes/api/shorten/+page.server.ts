import type { KVNamespace } from '@cloudflare/workers-types/experimental';
import { fail, type Actions } from '@sveltejs/kit';
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const url = formData.get('url') as string;
    const shortUrl = formData.get('shortUrl') as string;

    if (!url || !shortUrl) {
      return fail(400, {
        message: "URL and Short URL are required.",
      });
    }

    const kv = env["linkshortener-LINKS"] as KVNamespace;

    const existing = await kv.get(shortUrl);

    if (existing) {
      return fail(400, {
        message: "Short URL already exists.",
      });
    }

    await kv.put(shortUrl, JSON.stringify({ url, clicks: 0, history: [] }));

    return {
      status: 200,
      body: {
        success: true
      }
    };
  }
};