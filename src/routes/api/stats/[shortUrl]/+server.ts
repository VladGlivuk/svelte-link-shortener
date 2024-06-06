import type { KVNamespace } from '@cloudflare/workers-types/experimental';
import { json } from '@sveltejs/kit';
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();

export async function GET({ params }) {
  const shortUrl = params.shortUrl;

  const kv = env["linkshortener-LINKS"] as KVNamespace;
  const link = await kv.get(shortUrl);

  if (!link) {
    return new Response('Not Found', { status: 404 });
  }

  const data = JSON.parse(link);

  return json({ history: data.history, clicks: data.clicks });
}
