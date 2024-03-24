import type { JsonSchema } from "@jsonforms/core"
import type {
  ButtonProps,
  InputNumberProps,
  AlertProps,
  CardProps,
  DividerProps,
} from "antd"
import type { RuleObject as AntDRule } from "antd/es/form"
import type { TitleProps } from "antd/es/typography/Title"
import type { TextProps } from "antd/es/typography/Text"
import { Paths } from "./common/schema-derived-types"
import { objectSchema } from "./testSchemas/objectSchema"

// jsonforms has composed their types in such a way that recursive types only specify the "base" type
// this type is intended to fix that problem in the short term so that we can have strong type checking
// on ui schema configurations
// long-term solutions include but are not limited to: making a PR against their repo

export type UISchema<T extends string> =
  | UISchemaElement<T>
  | LayoutUISchema<T>
  | VerticalLayoutUISchema<T>
  | HorizontalLayoutUISchema<T>
  | LabelLayoutUISchema
  | GroupLayoutUISchema<T>
  | ControlUISchema<T>
  | CategorizationUISchema<T>
  | CategoryUISchema<T>

/**
 * Interface for describing an UI schema element that is referencing
 * a subschema. The value of the scope may be a JSON Pointer.
 */
interface Scopable {
  /**
   * The scope that determines to which part this element should be bound to.
   */
  scope?: string
}
/**
 * Interface for describing an UI schema element that is referencing
 * a subschema. The value of the scope must be a JSON Pointer.
 */
interface Scoped<T extends string> extends Scopable {
  /**
   * The scope that determines to which part this element should be bound to.
   */
  scope: T
}
/**
 * Interface for describing an UI schema element that may be labeled.
 */
interface Labelable<T = string> {
  /**
   * Label for UI schema element.
   */
  label?: string | T
}
/**
 * Interface for describing an UI schema element that is labeled.
 */
interface Labeled<T = string> extends Labelable<T> {
  label: string | T
}
interface Internationalizable {
  i18n?: string
}
/**
 * Common base interface for any UI schema element.
 */
interface UISchemaElement<
  TOptions = { [key: string]: unknown },
  T extends string = string,
> {
  /**
   * The type of this UI schema element.
   */
  type: string
  /**
   * An optional rule.
   */
  rule?: Rule<T>
  /**
   * Any additional options.
   */
  options?: TOptions
}
/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
interface LayoutUISchema<T extends string> extends UISchemaElement<T> {
  /**
   * The child elements of this layout.
   */
  elements: UISchema<T>[]
}
/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 */
export interface VerticalLayoutUISchema<T extends string> extends LayoutUISchema<T> {
  type: "VerticalLayout"
}
/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface HorizontalLayoutUISchema<T extends string> extends LayoutUISchema<T> {
  type: "HorizontalLayout"
}
/**
 * A group resembles a vertical layout, but additionally might have a label.
 * This layout is useful when grouping different elements by a certain criteria.
 */
export type GroupLayoutUISchema<T extends string> = BaseGroupLayoutUISchema<T> &
  // using {} is safe and appropriate when used in an intersection type
  // see last section of this comment: https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
  // eslint-disable-next-line @typescript-eslint/ban-types
  (| {}
    | { groupType: "Card"; cardProps: CardProps }
    | {
        groupType: "Divider"
        topDividerProps: DividerProps
        bottomDividerProps: DividerProps
      }
  )

interface BaseGroupLayoutUISchema<T extends string>
  extends LayoutUISchema<T>,
    Labelable,
    Internationalizable {
  type: "Group"
}
/**
 * Represents an object that can be used to configure a label.
 */
export type LabelDescription = BaseLabelDescription &
  // using {} is safe and appropriate when used in an intersection type
  // see last section of this comment: https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
  // eslint-disable-next-line @typescript-eslint/ban-types
  (| {}
    | { type: "Title"; titleProps: TitleProps }
    | { type: "Text"; textProps: TextProps }
  )

type BaseLabelDescription = {
  text: string
  show?: boolean
}
/**
 * A label element.
 */
export interface LabelLayoutUISchema
  extends UISchemaElement,
    Internationalizable {
  type: "Label"
  /**
   * The text of label.
   */
  text: string
  options?: LabelOptions
}

export type AlertLayoutOptions = { type: AlertProps["type"] }

// this is intended to be a union, it just has one member rn
export type LabelOptions = AlertLayoutOptions

export const OneOfControlOptions = [
  "button",
  "dropdown",
  "radio",
  "toggle",
  "segmented",
] as const

export type OneOfControlOption = (typeof OneOfControlOptions)[number]

export type OneOfControlOptions = {
  optionType?: OneOfControlOption
  toggleLabel?: string
}

export type TextControlType = "multiline" | "password" | "singleline"

export type TextControlOptions = {
  type?: TextControlType
  tooltip?: string
  placeholderText?: string
  required?: boolean
  rules: AntDRule[]
}

export type AnyOfControlOptions = {
  optionType?: AnyOfControlOption
  required?: boolean
}

export const AnyOfControlOptions = ["button", "dropdown", "radio"] as const
export type AnyOfControlOption = (typeof AnyOfControlOptions)[number]

type ControlOptions =
  | OneOfControlOptions
  | TextControlOptions
  | AnyOfControlOptions
  | ArrayControlOptions

const ObjectUISchema: UISchema<Paths<typeof objectSchema>> = {
  type: "VerticalLayout",
  elements: [
    {type: "Control", scope: "#/properties/name"}
  ]
} // satisfies UISchema<Paths<typeof objectSchema>>

console.log(ObjectUISchema)
/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export interface ControlUISchema<T extends string>
  extends UISchemaElement<ControlOptions, T>,
    Scoped<T>,
    Labelable<string | boolean | LabelDescription>,
    Internationalizable {
  type: "Control"
}
/**
 * The category layout.
 */
interface CategoryUISchema<T extends string>
  extends LayoutUISchema<T>,
    Labeled,
    Internationalizable {
  type: "Category"
}
/**
 * The categorization element, which may have children elements.
 * A child element may either be itself a Categorization or a Category, hence
 * the categorization element can be used to represent recursive structures like trees.
 */
interface CategorizationUISchema<T extends string>
  extends UISchemaElement,
    Labeled,
    Internationalizable {
  type: "Categorization"
  /**
   * The child elements of this categorization which are either of type
   * {@link CategoryUISchema} or {@link CategorizationUISchema}.
   */
  elements: (CategoryUISchema<T> | CategorizationUISchema<T>)[]
}

/**
 * A rule that may be attached to any UI schema element.
 */
interface Rule<T extends string> {
  /**
   * The effect of the rule
   */
  effect: RuleEffect
  /**
   * The condition of the rule that must evaluate to true in order
   * to trigger the effect.
   */
  condition: Condition<T>
}

enum RuleEffect {
  /**
   * Effect that hides the associated element.
   */
  HIDE = "HIDE",
  /**
   * Effect that shows the associated element.
   */
  SHOW = "SHOW",
  /**
   * Effect that enables the associated element.
   */
  ENABLE = "ENABLE",
  /**
   * Effect that disables the associated element.
   */
  DISABLE = "DISABLE",
}
type Condition<T extends string> =
  | Record<string, never> // not documented in their type system AFAIK, but this is how you default a rule to "always true"
  | (
      | JFCondition
      | LeafCondition<T>
      | SchemaBasedCondition<T>
      | OrCondition<T>
      | AndCondition<T>
    )

interface JFCondition {
  /**
   * The type of condition.
   */
  readonly type?: string
}
/**
 * A leaf condition.
 */
type LeafCondition<T extends string> = JFCondition &
  Scoped<T> & {
    type: "LEAF"
    /**
     * The expected value when evaluating the condition
     */
    expectedValue: unknown
  }
type SchemaBasedCondition<T extends string> = JFCondition &
  Scoped<T> & {
    schema: JsonSchema
  }
/**
 * A composable condition.
 */
type ComposableCondition<T extends string> = JFCondition & {
  conditions: Condition<T>[]
}
/**
 * An or condition.
 */
type OrCondition<T extends string> = ComposableCondition<T> & {
  type: "OR"
}
/**
 * An and condition.
 */
type AndCondition<T extends string> = ComposableCondition<T> & {
  type: "AND"
}

export type AddButtonLocation = "top" | "bottom"

export interface ArrayControlOptions {
  addButtonProps?: ButtonProps
  removeButtonProps?: ButtonProps
  addButtonLocation?: AddButtonLocation
}

export type NumericControlOptions = {
  addonBefore?: InputNumberProps["addonBefore"]
  addonAfter?: InputNumberProps["addonAfter"]
}
