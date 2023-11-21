<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>{$page.status} | Project ICE</title>
</svelte:head>

<div class="error">
<center><h1>{$page.status} {$page.error.message}</h1></center>
<hr><center>openresty</center>
</div>

<style>
    .error {
        font-family: initial !important;
    }
</style>
