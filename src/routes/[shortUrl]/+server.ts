import type { Link } from "$lib/types";
import type { KVNamespace } from "@cloudflare/workers-types/experimental";
import { redirect } from "@sveltejs/kit";
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();

export async function GET({ params, request }) {
    const shortUrl = params.shortUrl;

    const kv = env["linkshortener-LINKS"] as KVNamespace;

    const link = await kv.get(shortUrl);

    if (link) {
        const data = JSON.parse(link) as Link;

        data.clicks++;

        data.history.push({
            time: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('cf-connecting-ip'),
            geo: request.headers.get('cf-ipcountry')
        });

        await kv.put(shortUrl, JSON.stringify(data));

        throw redirect(302, data.url);
    } else {
        return new Response('Short URL not found', { status: 404 });
    }
}