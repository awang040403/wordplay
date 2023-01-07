import type StructureDefinition from '../nodes/StructureDefinition';
import type Translation from '../translations/Translation';
import Conflict from './Conflict';

export class DisallowedInputs extends Conflict {
    readonly structure: StructureDefinition;

    constructor(structure: StructureDefinition) {
        super(false);
        this.structure = structure;
    }

    getConflictingNodes() {
        return {
            primary: this.structure.names,
        };
    }

    getPrimaryExplanation(translation: Translation) {
        return translation.conflict.DisallowedInputs.primary;
    }

    getSecondaryExplanation() {
        return undefined;
    }
}
