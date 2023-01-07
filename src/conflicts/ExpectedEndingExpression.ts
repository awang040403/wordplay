import type Block from '../nodes/Block';
import type Translation from '../translations/Translation';
import Conflict from './Conflict';

export class ExpectedEndingExpression extends Conflict {
    readonly block: Block;

    constructor(block: Block) {
        super(false);
        this.block = block;
    }

    getConflictingNodes() {
        return { primary: this.block };
    }

    getPrimaryExplanation(translation: Translation) {
        return translation.conflict.ExpectedEndingExpression.primary;
    }

    getSecondaryExplanation() {
        return undefined;
    }
}
