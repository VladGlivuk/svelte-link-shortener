import { fail, type Actions } from '@sveltejs/kit';

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

    // TODO uncomment when connect KV
    // const existing = await LINKS.get(shortUrl);
    // if (existing) {
    //   return {
    //     status: 400,
    //     body: {
    //       error: 'Short URL already exists'
    //     }
    //   };
    // }

    // await LINKS.put(shortUrl, JSON.stringify({ url, clicks: 0, history: [] }));

    return {
      status: 200,
      body: {
        success: true
      }
    };
  }
};