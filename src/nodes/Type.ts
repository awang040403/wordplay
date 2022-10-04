import type ConversionDefinition from "./ConversionDefinition";
import type FunctionDefinition from "./FunctionDefinition";
import Node from "./Node";
import type Context from "./Context";

export default abstract class Type extends Node {

    constructor() {
        super();
    }

    abstract isCompatible(type: Type, context: Context): boolean;
    abstract getNativeTypeName(): string;

    getConversion(context: Context, input: Type, output: Type): ConversionDefinition | undefined {
        return context.native?.getConversion(this.getNativeTypeName(), context, input, output);
    }

    getFunction(context: Context, name: string): FunctionDefinition | undefined {
        return context.native?.getFunction(this.getNativeTypeName(), name);
    }

    resolveTypeVariable(name: string): Type | undefined { name; return undefined };

}