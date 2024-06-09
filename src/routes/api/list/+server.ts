import type { KVNamespace } from "@cloudflare/workers-types/experimental";
import { json } from "@sveltejs/kit";

export async function GET({ platform }) {
  const kv = platform?.env['linkshortener-LINKS'] as KVNamespace;

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
