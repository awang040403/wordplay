import type StructureDefinition from "../nodes/StructureDefinition";
import StructureType, { STRUCTURE_NATIVE_TYPE_NAME } from "../nodes/StructureType";
import type Type from "../nodes/Type";
import Unparsable from "../nodes/Unparsable";
import type ConversionValue from "./ConversionValue";
import Evaluation from "./Evaluation";
import type Evaluator from "./Evaluator";
import Value from "./Value";

export default class Structure extends Value {

    readonly type: StructureDefinition;
    readonly context: Evaluation;

    constructor(context: Evaluation) {
        super();

        this.type = context.getDefinition() as StructureDefinition;
        this.context = context;

    }

    getType() { return new StructureType(this.type); }

    getNativeTypeName(): string { return STRUCTURE_NATIVE_TYPE_NAME; }

    resolve(name: string) {
        return this.context.resolve(name);
    }

    getConversion(input: Type, output: Type): ConversionValue | undefined {
        return this.context.getConversion(input, output);
    }

    toString(): string {
        return `${this.type.aliases[0].getName()}(${this.type.inputs.map(bind => {
            
            if(bind instanceof Unparsable) return "";
            
            const name = bind.names[0].getName();
            const value = name == undefined ? undefined : this.resolve(name);
            return value === undefined ? "" : `${name}: ${value}`;
        
        }).join(" ")})`;
    }


}

export function createStructure(evaluator: Evaluator, definition: StructureDefinition, values: Record<string, Value>): Structure {

    const bindings = new Map<string,Value>();
    Object.keys(values).forEach(key => bindings.set(key, values[key]));
    return new Structure(new Evaluation(evaluator, definition, definition, undefined, bindings));

}