<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { History } from '$lib/types';

	let history: Array<History> = [];
	let totalClicks = 0;
	let shortUrl = $page.params.shortUrl;

	onMount(async () => {
		const response = await fetch(`/api/stats/${shortUrl}`);

		const data = await response.json();
		history = data.history;
		totalClicks = data.clicks;
	});
</script>

<h1>Stats for {shortUrl}</h1>
<p>Total Clicks: {totalClicks}</p>

<table>
	<thead>
		<tr>
			<th>Time</th>
			<th>User Agent</th>
			<th>IP</th>
			<th>Geo</th>
		</tr>
	</thead>
	<tbody>
		{#each history as { time, userAgent, ip, geo }}
			<tr>
				<td>{time}</td>
				<td>{userAgent}</td>
				<td>{ip}</td>
				<td>{geo}</td>
			</tr>
		{/each}
	</tbody>
</table>
