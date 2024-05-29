// TODO Add KV

export async function GET() {
    // TODO change link
    const url = 'https://obs.nodeart.app/NA/Hire/Questions/Svelte-Kit-Test-Task';

    if (url) {
        return new Response(null, {
            status: 302,
            headers: {
                'Location': url
            }
        })
    } else {
        return new Response('Short URL not found', { status: 404 });
    }
}