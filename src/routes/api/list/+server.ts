import type { KVNamespace } from '@cloudflare/workers-types/experimental';
import { json } from '@sveltejs/kit';
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();

export async function GET() {
  const kv = env["linkshortener-LINKS"] as KVNamespace;

  const allLinks = await kv.list()

  const links = await Promise.all(
    allLinks.keys.map(async ({ name }) => {
      const link = await kv.get(name);
      const data = JSON.parse(link as string);

      return { shortUrl: name, url: data.url };
    })
  );

  return json(links);
}
