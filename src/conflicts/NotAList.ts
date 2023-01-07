import type Context from '../nodes/Context';
import type ListAccess from '../nodes/ListAccess';
import type Type from '../nodes/Type';
import NodeLink from '../translations/NodeLink';
import type Translation from '../translations/Translation';
import Conflict from './Conflict';

export class NotAList extends Conflict {
    readonly access: ListAccess;
    readonly received: Type;

    constructor(access: ListAccess, received: Type) {
        super(false);

        this.access = access;
        this.received = received;
    }

    getConflictingNodes() {
        return { primary: this.access.list };
    }

    getPrimaryExplanation(translation: Translation, context: Context) {
        return translation.conflict.NotAList.primary(
            new NodeLink(this.received, translation, context)
        );
    }

    getSecondaryExplanation() {
        return undefined;
    }
}
