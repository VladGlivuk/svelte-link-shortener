<script>
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
  import '../global.css';
  import '@picocss/pico';
</script>

<Header />

<main>
  <slot />
</main>

<Footer />