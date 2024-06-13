<script lang="ts">
	import { onMount } from 'svelte';

  type ListLink = {
    shortUrl: string;
    url: string;
  }

	let links: Array<ListLink> = [];

	onMount(async () => {
		const response = await fetch('/api/list');
		links = await response.json();
	});
</script>

<h1>All Shortened URLs</h1>
<ul>
	{#each links as {url, shortUrl}}
		<li><a href={`/${shortUrl}`}>{shortUrl}</a> -> {url}</li>
	{/each}
</ul>
