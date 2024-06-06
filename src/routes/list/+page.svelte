<script lang="ts">
	import { onMount } from 'svelte';

  type Link = {
    shortUrl: string;
    url: string;
  }

	let links: Array<Link> = [];

	onMount(async () => {
		const response = await fetch('/api/list');
		links = await response.json();
	});
</script>

<h1>All Shortened URLs</h1>
<ul>
	{#each links as link}
		<li><a href={`/${link.shortUrl}`}>{link.shortUrl}</a> -> {link.url}</li>
	{/each}
</ul>
