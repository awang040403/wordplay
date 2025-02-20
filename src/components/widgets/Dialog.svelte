<script lang="ts">
    import { clickOutside } from '@components/app/clickOutside';
    import setKeyboardFocus from '@components/util/setKeyboardFocus';
    import { tick } from 'svelte';
    import { locales } from '../../db/Database';
    import type { DialogText } from '../../locale/UITexts';
    import Header from '../app/Header.svelte';
    import MarkupHtmlView from '../concepts/MarkupHTMLView.svelte';
    import Button from './Button.svelte';

    interface Props {
        show?: boolean;
        description: DialogText;
        closeable?: boolean;
        button?: { tip: string; icon?: string; label: string } | undefined;
        children?: import('svelte').Snippet;
    }

    let {
        show = $bindable(false),
        description,
        closeable = true,
        button = undefined,
        children,
    }: Props = $props();

    let view: HTMLDialogElement | undefined = $state(undefined);

    /** Show and focus dialog when shown, hide when not. */
    $effect(() => {
        if (view) {
            if (show) {
                view.showModal();
                tick().then(() =>
                    view
                        ? setKeyboardFocus(view, 'Focusing dialog')
                        : undefined,
                );
            } else {
                view.close();
            }
        }
    });
</script>

{#if button}
    <Button tip={button.tip} action={() => (show = true)} icon={button.icon}>
        {#if button.label.length > 0}
            {button.label}{/if}</Button
    >
{/if}
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
    bind:this={view}
    use:clickOutside={() => (show = false)}
    tabindex="-1"
    onkeydown={closeable
        ? (event) => (event.key === 'Escape' ? (show = false) : undefined)
        : undefined}
>
    <div class="container">
        {#if closeable}
            <div class="close">
                <Button
                    tip={$locales.get((l) => l.ui.widget.dialog.close)}
                    action={() => (show = false)}
                    icon="❌"
                ></Button>
            </div>
        {/if}

        <div class="content">
            <Header>{description.header}</Header>
            <MarkupHtmlView markup={description.explanation} />
            {@render children?.()}
        </div>
    </div>
</dialog>

<style>
    dialog {
        position: relative;
        border-radius: var(--wordplay-border-radius);
        padding: 0;
        margin-left: auto;
        margin-right: auto;
        max-width: 95vw;
        height: max-content;
        background-color: var(--wordplay-background);
        color: var(--wordplay-foreground);
        border: var(--wordplay-border-width) solid var(--wordplay-border-color);
    }

    dialog::backdrop {
        transition: backdrop-filter;
        backdrop-filter: blur(2px);
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: var(--wordplay-spacing);
        padding: 1em;
    }

    .close {
        position: sticky;
        top: 0;
        width: 100%;
        text-align: right;
    }

    .content {
        min-height: 100%;
        padding: 1em;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        gap: var(--wordplay-spacing);
    }
</style>
