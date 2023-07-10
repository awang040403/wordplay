import type { NodeText } from './NodeText';
import type { Template } from './Locale';

export interface AtomicExpressionText {
    start: Template;
}

export interface ExpressionText extends AtomicExpressionText {
    finish: Template;
}

export interface Conflicts<T> {
    conflict: T;
}

export type InternalConflictText = Template;
export type ConflictText = { primary: Template; secondary: Template };

export interface Exceptions<T> {
    exception: T;
}

type NodeTexts = {
    Dimension: NodeText;
    Doc: NodeText;
    Docs: NodeText;
    KeyValue: NodeText;
    Language: NodeText &
        Conflicts<{
            InvalidLanguage: InternalConflictText;
            MissingLanguage: InternalConflictText;
        }>;
    /**
     * Description
     * $1: name or undefined
     */
    Name: NodeText;
    Names: NodeText;
    Row: NodeText &
        Conflicts<{
            InvalidRow: InternalConflictText;
            /**
             * $1: Column
             * $2: Row
             * */
            MissingCell: ConflictText;
            UnknownColumn: InternalConflictText;
        }>;
    /**
     * Description
     * $1: token label
     * $1: token text
     */
    Token: NodeText;
    TypeInputs: NodeText;
    TypeVariable: NodeText &
        Conflicts<{
            /** $1: The duplicate */
            DuplicateTypeVariable: ConflictText;
        }>;
    TypeVariables: NodeText;
    Paragraph: NodeText;
    WebLink: NodeText;
    ConceptLink: NodeText;
    Words: NodeText;
    Example: NodeText;
    /**
     * Start
     * $1: left expression
     * Finish
     * $1: result
     */
    BinaryOperation: NodeText &
        ExpressionText & {
            right: Template;
        } & Conflicts<{ OrderOfOperations: InternalConflictText }>;
    /**
     * Start
     * $1: bind evaluating
     * Finish
     * $1: resulting value
     * $2: names bound
     */
    Bind: NodeText &
        ExpressionText &
        Conflicts<{
            /** $1: The name that shadowed this one */
            DuplicateName: ConflictText;
            /** $1: The duplicate */
            DuplicateShare: ConflictText;
            /**
             * $1: Expected
             * $2: Given
             * */
            IncompatibleBind: ConflictText;
            MisplacedShare: InternalConflictText;
            MissingShareLanguages: InternalConflictText;
            RequiredAfterOptional: InternalConflictText;
            UnexpectedEtc: InternalConflictText;
            UnusedBind: InternalConflictText;
        }>;
    /**
     * Description
     * $1: # of statements
     * Start
     * No inputs
     * Finish
     * $1: Resulting value
     */
    Block: NodeText &
        ExpressionText & {
            statement: Template;
        } & Conflicts<{
            ExpectedEndingExpression: InternalConflictText;
            IgnoredExpression: ConflictText;
        }>;
    /**
     * Description
     * $1: true if true, false otherwise
     */
    BooleanLiteral: NodeText & AtomicExpressionText;
    /**
     * Start
     * $1: source
     * $2: name borrowed
     */
    Borrow: NodeText &
        AtomicExpressionText & {
            source: Template;
            bind: Template;
            version: Template;
        } & Conflicts<{
            UnknownBorrow: InternalConflictText;
            /** $1: borrow that had a cycle */
            BorrowCycle: InternalConflictText;
        }> &
        Exceptions<{
            /** $1: Borrow that it depends on */
            CycleException: Template;
        }>;

    /**
     * Start
     * $1: stream that changed
     */
    Changed: NodeText &
        AtomicExpressionText & {
            stream: Template;
        };
    /**
     * Start
     * $1: condition to check
     * Finish
     * $1: resulting value
     */
    Conditional: NodeText &
        ExpressionText & {
            condition: Template;
            yes: Template;
            no: Template;
        } & Conflicts<{
            /** $1: The non-boolean expression */
            ExpectedBooleanCondition: ConflictText;
        }>;
    ConversionDefinition: NodeText &
        AtomicExpressionText &
        Conflicts<{ MisplacedConversion: InternalConflictText }>;
    /**
     * Start
     * $1: expression to convert
     * Finish
     * $1: resulting value
     */
    Convert: NodeText &
        ExpressionText &
        Conflicts<{
            /**
             * $1: From type
             * $2: To type
             * */
            UnknownConversion: InternalConflictText;
        }>;
    /**
     * Start
     * $1: table expression
     * Finish
     * $1: resulting value
     */
    Delete: NodeText & ExpressionText;
    DocumentedExpression: NodeText & AtomicExpressionText;
    /**
     * Descriptionn
     * $1: name of function being evaluated
     * Start
     * no inputs
     * Finish
     * $1: resulting value
     */
    Evaluate: NodeText &
        ExpressionText & {
            function: Template;
            input: Template;
        } & Conflicts<{
            /**
             * $1: Expected
             * $2: Given
             * */
            IncompatibleInput: ConflictText;
            /**
             * $1: Definition
             * $2: Type
             * */
            UnexpectedTypeInput: ConflictText;
            MisplacedInput: InternalConflictText;
            /**
             * $1: Missing input
             * $2: Evaluate that is missing input
             * */
            MissingInput: ConflictText;
            NotInstantiable: InternalConflictText;
            /**
             * $1: Evaluate with unexected input
             * $2: Unexpected input
             * */
            UnexpectedInput: ConflictText;
            UnknownInput: ConflictText;
            InputListMustBeLast: InternalConflictText;
        }> &
        Exceptions<{
            /** $1: Name of function not found in scope */
            FunctionException: Template;
        }>;
    /**
     * Description
     * $1: type or undefined
     */
    ExpressionPlaceholder: NodeText &
        AtomicExpressionText & {
            placeholder: Template;
        } & Conflicts<{ Placeholder: InternalConflictText }> &
        Exceptions<{
            /** No inputs */
            UnimplementedException: Template;
        }>;
    /**
     * Description
     * $1: function name in locale
     */
    FunctionDefinition: NodeText &
        AtomicExpressionText &
        Conflicts<{
            NoExpression: InternalConflictText;
        }>;
    /**
     * Finish
     * $1: resulting value
     */
    HOF: NodeText & ExpressionText;
    /**
     * Start
     * $1: table expression
     * Finish
     * $1: resulting value
     */
    Insert: NodeText & ExpressionText;
    Initial: NodeText;
    /**
     * Start
     * $1: expression
     * Finish
     * $1: result
     * $2: type
     */
    Is: NodeText &
        ExpressionText &
        Conflicts<{ ImpossibleType: InternalConflictText }> &
        Exceptions<{
            /**
             * $1 = expected type
             * $2 = received type
             */
            TypeException: Template;
        }>;
    /**
     * Start
     * $1: list
     * Finish
     * $1: resulting value
     */
    ListAccess: NodeText & ExpressionText;
    /**
     * Description
     * $1: item count
     * Finish
     * $1: resulting value
     */
    ListLiteral: NodeText &
        ExpressionText & {
            item: Template;
        };
    /**
     * Finish
     * $1: resulting value
     */
    MapLiteral: NodeText &
        ExpressionText &
        Conflicts<{
            /**
             * $1: Expression that's not a map
             * */
            NotAKeyValue: ConflictText;
        }>;
    /**
     * Description
     * $1: number
     * $1: unit
     * Start
     * $1: the node
     */
    MeasurementLiteral: NodeText &
        AtomicExpressionText &
        Conflicts<{ NotANumber: InternalConflictText }>;
    NativeExpression: NodeText & AtomicExpressionText;
    NoneLiteral: NodeText & AtomicExpressionText;
    /**
     * Start
     * $1: the stream expression being checked
     * Finish
     * $1: resulting value
     */
    Previous: NodeText & ExpressionText;
    /**
     * Start
     * $1: a stream that changed
     * Finish
     * $1: resulting value
     */
    Program: NodeText &
        ExpressionText &
        Exceptions<{
            /** No inputs */ BlankException: Template;
            /** $1: The function that was evaluated too many times */
            EvaluationLimitException: Template;
            /** No inputs */
            StepLimitException: Template;
            ValueException: Template;
        }>;
    /**
     * Finish
     * $1: revised property
     * $1: revised value
     */
    PropertyBind: NodeText & ExpressionText;
    /**
     * Finish
     * $1: revised property
     * $1: revised value
     */
    PropertyReference: NodeText &
        ExpressionText & {
            property: Template;
        };
    /**
     * Finish
     * $1: resulting value
     */
    Reaction: NodeText &
        ExpressionText & {
            initial: Template;
            condition: Template;
            next: Template;
        };
    /**
     * Description
     * $1: the name
     * Start
     * $1: the name being resolved
     */
    Reference: NodeText &
        AtomicExpressionText & {
            name: Template;
        } & Conflicts</** $1: The name that depends on itself */
        {
            /**
             * $1: Scope
             * */
            UnknownName: InternalConflictText;
            ReferenceCycle: InternalConflictText;
            UnexpectedTypeVariable: InternalConflictText;
        }> &
        Exceptions<{
            /** $1: Scope in which name was not found */
            NameException: Template;
        }>;
    /**
     * Finish
     * $1: the table
     * $1: the result
     */
    Select: NodeText &
        ExpressionText &
        Conflicts<{
            /** $1: The select expression */
            ExpectedSelectName: InternalConflictText;
        }>;
    /**
     * Finish
     * $1: the new set
     */
    SetLiteral: NodeText & ExpressionText;
    /**
     * Finish
     * $1: the set/map value
     */
    SetOrMapAccess: NodeText &
        ExpressionText &
        Conflicts<{
            /**
             * $1: Expected
             * $2: Given
             * */
            IncompatibleKey: ConflictText;
        }>;
    Source: NodeText;
    StreamDefinition: NodeText & AtomicExpressionText;
    /**
     * Description
     * $1: name of the structure
     */
    StructureDefinition: NodeText &
        AtomicExpressionText &
        Conflicts<{
            DisallowedInputs: InternalConflictText;
            IncompleteImplementation: InternalConflictText;
            NotAnInterface: InternalConflictText;
            /**
             * $1: Interface
             * $2: Function
             * */
            UnimplementedInterface: InternalConflictText;
        }>;
    /**
     * Finish
     * $1: resulting table
     */
    TableLiteral: NodeText &
        ExpressionText & {
            item: Template;
        };
    Template: NodeText & ExpressionText;
    /**
     * Description
     * $1: the text
     */
    TextLiteral: NodeText & AtomicExpressionText;
    /**
     * Finish
     * $1: resulting value
     */
    This: NodeText &
        AtomicExpressionText &
        Conflicts<{ MisplacedThis: InternalConflictText }>;
    /**
     * Description
     * $1: the operator
     * Finish
     * $1: resulting value
     */
    UnaryOperation: NodeText & ExpressionText;
    UnparsableExpression: NodeText &
        AtomicExpressionText &
        Conflicts<{
            /**
             * $1: True if expression, false if type
             * */
            UnparsableConflict: InternalConflictText;
            /**
             * $1: Unclosed token
             * $2: Opening delimiter
             * */
            UnclosedDelimiter: InternalConflictText;
        }> &
        Exceptions<{
            /** No inputs */
            UnparsableException: Template;
        }>;
    /**
     * Start
     * $1: the table
     * Finish
     * $1: resulting value
     */
    Update: NodeText &
        ExpressionText &
        Conflicts<{
            ExpectedUpdateBind: InternalConflictText;
            /**
             * $1: Expected
             * $2: Given
             * */
            IncompatibleCellType: ConflictText;
        }>;
    AnyType: NodeText;
    BooleanType: NodeText;
    ConversionType: NodeText;
    ExceptionType: NodeText;
    FunctionDefinitionType: NodeText;
    FunctionType: NodeText;
    /**
     * Description
     * $1: Type or undefined
     */
    ListType: NodeText;
    /**
     * Description
     * $1: Key type or undefined
     * $2: Map type or undefined
     */
    MapType: NodeText;
    MeasurementType: NodeText;
    /**
     * Description
     * $1: Type name
     */
    NameType: NodeText &
        Conflicts<{
            /**
             * $1: Invalid type
             * */
            UnknownTypeName: InternalConflictText;
        }>;
    NeverType: NodeText;
    NoneType: NodeText;
    /**
     * Description
     * $1: Type expected
     */
    NotAType: NodeText;
    /**
     * Description
     * $1: Type or undefined
     */
    SetType: NodeText;
    StreamDefinitionType: NodeText;
    StreamType: NodeText;
    StructureDefinitionType: NodeText;
    TableType: NodeText &
        Conflicts<{
            /** $: The missing column */
            ExpectedColumnType: InternalConflictText;
        }>;
    /**
     * Description
     * $1: Concrete type or undefined
     */
    TextType: NodeText;
    TypePlaceholder: NodeText;
    /**
     * Description
     * $1: Name that's not known or undefined
     */
    UnknownNameType: NodeText;
    UnknownType: NodeText & { unknown: string; connector: string };
    /**
     * Description
     * $1: left
     * $2: right
     */
    UnionType: NodeText;
    UnparsableType: NodeText;
    /**
     * Description
     * $1: unit description
     */
    Unit: NodeText;
    VariableType: NodeText;
    CycleType: NodeText;
    UnknownVariableType: NodeText;
    NoExpressionType: NodeText;
    NotEnclosedType: NodeText;
    NotImplementedType: NodeText;
};

export default NodeTexts;