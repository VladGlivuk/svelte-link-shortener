import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const shortUrl = params.shortUrl;
	const response = await fetch(`/api/stats/${shortUrl}`);
	const data = await response.json();

	return {
		history: data.history,
		totalClicks: data.clicks,
		shortUrl: shortUrl
	};
};
