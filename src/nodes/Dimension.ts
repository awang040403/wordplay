import { EXPONENT_SYMBOL } from "../parser/Tokenizer";
import Add from "../transforms/Add";
import Replace from "../transforms/Replace";
import type Transform from "../transforms/Transform";
import type Context from "./Context";
import { getPossibleDimensions } from "../transforms/getPossibleUnits";
import Node from "./Node";
import Token from "./Token";
import TokenType from "./TokenType";
import NameToken from "./NameToken";
import Remove from "../transforms/Remove";

export default class Dimension extends Node {

    readonly name: Token;
    readonly caret?: Token;
    readonly exponent?: Token;

    constructor(name: Token | string, caret?: Token, exponent?: Token) {
        super();

        this.name = typeof name === "string" ? new NameToken(name) : name;
        this.caret = caret === undefined ? undefined : caret.withPrecedingSpace("", true);
        this.exponent = exponent === undefined ? undefined : exponent.withPrecedingSpace("", true);

    }

    clone(pretty: boolean=false, original?: Node | string, replacement?: Node) { 
        return new Dimension(
            this.cloneOrReplaceChild(pretty, [ Token ], "name", this.name, original, replacement), 
            this.cloneOrReplaceChild(pretty, [ Token, undefined ], "caret", this.caret, original, replacement),
            this.cloneOrReplaceChild(pretty, [ Token, undefined ], "exponent", this.exponent, original, replacement)
        ) as this; 
    }

    getName() { return this.name.getText(); }

    computeChildren() {
        const children = [ this.name ];
        if(this.caret) children.push(this.caret);
        if(this.exponent) children.push(this.exponent);
        return children;
    }

    computeConflicts() {}

    getDescriptions() {
        const dim = this.getName();
        return {
            eng: 
                dim === "pm" ? "picometers" :
                dim === "nm" ? "nanometers" :
                dim === "µm" ? "micrometers" :
                dim === "mm" ? "millimeters" :
                dim === "m" ? "centimeters" :
                dim === "cm" ? "centimeters" :
                dim === "dm" ? "decimeters" :
                dim === "m" ? "meters" :
                dim === "km" ? "kilometers" :
                dim === "Mm" ? "megameters" :
                dim === "Gm" ? "gigameters" :
                dim === "Tm" ? "terameters" :
                dim === "mi" ? "miles" :
                dim === "in" ? "inches" :
                dim === "ft" ? "feet" :
                dim === "ms" ? "milliseconds" :
                dim === "s" ? "seconds" :
                dim === "min" ? "minutes" :
                dim === "hr" ? "hours" :
                dim === "day" ? "days" :
                dim === "wk" ? "weeks" :
                dim === "yr" ? "years" :
                dim === "g" ? "grams" :
                dim === "mg" ? "milligrams" :
                dim === "kg" ? "kilograms" :
                dim === "oz" ? "ounces" :
                dim === "lb" ? "pounds" :
                dim === "pt" ? "font size" :
                "A dimension"
            }
    }

    getChildReplacement(child: Node, context: Context) {

        const project = context.source.getProject();
        // Dimension names can be any of the possible dimensions in the project.
        if(child === this.name && project !== undefined)
            return getPossibleDimensions(project)
                .map(dimension => new Replace(context.source, child, new NameToken(dimension)));

    }

    getInsertionBefore() { return undefined; }

    getInsertionAfter(context: Context, position: number): Transform[] | undefined { 

        if(this.caret === undefined)
            return [ new Add(context.source, position, this, "exponent", new Token(EXPONENT_SYMBOL, TokenType.UNARY_OP)) ];
    }

    getChildRemoval(child: Node, context: Context): Transform | undefined {
        if(child === this.exponent && this.caret) return new Remove(context.source, this, this.caret, child);
    }

}