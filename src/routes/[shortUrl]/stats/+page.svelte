<script lang="ts">
	import type { Stats } from '$lib/types';

	export let data: Stats;
	const { history, shortUrl, totalClicks } = data;
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
