<script lang="ts">
    import { locales } from '@db/Database';
    import type Project from '@db/projects/Project';
    import Sym from '@nodes/Sym';
    import Token from '@nodes/Token';
    import { toTokens } from '@parser/toTokens';
    import TokenTextEditor from './TokenEditor.svelte';

    interface Props {
        number: Token;
        project: Project;
        text: string;
        placeholder: string;
    }

    let { number, project, text, placeholder }: Props = $props();
</script>

<TokenTextEditor
    token={number}
    {project}
    {text}
    {placeholder}
    validator={(newNumber) => {
        const tokens = toTokens(newNumber);
        return tokens.remaining() === 2 && tokens.nextIs(Sym.Number)
            ? true
            : $locales.get((l) => l.ui.palette.error.nan);
    }}
    creator={(text) => new Token(text, Sym.Number)}
/>
