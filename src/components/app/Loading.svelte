<script lang="ts">
    import { locales } from '@db/Database';
    import Spinning from './Spinning.svelte';
</script>

<div class="container">
    <Spinning label={$locales.get((l) => l.ui.widget.loading.message)} large />
    <p>{$locales.get((l) => l.ui.widget.loading.message)}</p>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--wordplay-spacing);
    }
</style>
