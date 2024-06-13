<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let url: string = '';
	let shortUrl: string = '';
	let error: string = '';
	let success: boolean = false;
	let loading: boolean = false;

	function validateUrl(value: string): boolean {
		try {
			new URL(value);
			return true;
		} catch (_err) {
			return false;
		}
	}

  const onSubmit: SubmitFunction = () => {
    loading = true;

		if (!validateUrl(url)) {
			error = 'Invalid URL';
			loading = false;
			return;
		}

    return ({ result, update }) => {
				if (result.type === 'success') {
					success = true;
					error = "";
          result.data
				} else if (result.type === 'failure') {
					error = result?.data?.message;
          update();
				}

        setTimeout(() => {
				  loading = false;
        }, 200);
    };
	}
</script>

<form
	method="post"
	action="/api/shorten"
	use:enhance={onSubmit}
>
	<label for="url">Long URL</label>
	<input name="url" id="url" bind:value={url} type="url" required />

	<label for="shortUrl">Desired Short URL</label>
	<input name="shortUrl" id="shortUrl" bind:value={shortUrl} required />

	<button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
</form>

{#if success}
	<p>Success! Your shorten link: <a data-sveltekit-preload-data="hover" href={`/${shortUrl}`} target="_blank">{`${window.location.origin}/${shortUrl}`}</a>

	View your stats at <a data-sveltekit-preload-data="hover" href={`/${shortUrl}/stats`}>/{shortUrl}/stats</a></p>
{/if}

{#if error}
	<p class="error">{error}</p>
{/if}
