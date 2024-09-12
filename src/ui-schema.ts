import type { JsonSchema } from "@jsonforms/core"
import type {
  AlertProps,
  ButtonProps,
  CardProps,
  DividerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
} from "antd"
import type { TextAreaProps } from "antd/es/input"
import type { RuleObject as AntDRule } from "antd/es/form"
import type { TitleProps } from "antd/es/typography/Title"
import type { TextProps } from "antd/es/typography/Text"
import { SchemaAwareScope } from "./common/schema-derived-types"

// jsonforms has composed their types in such a way that recursive types only specify the "base" type
// this type is intended to fix that problem in the short term so that we can have strong type checking
// on ui schema configurations
// long-term solutions include but are not limited to: making a PR against their repo

export type UISchema<T> =
  | UISchemaElement<T>
  | LayoutUISchema<T>
  | VerticalLayoutUISchema<T>
  | HorizontalLayoutUISchema<T>
  | LabelLayoutUISchema<T>
  | GroupLayoutUISchema<T>
  | ControlUISchema<T>
  | CategorizationUISchema<T>
  | CategoryUISchema<T>

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

export interface ColumnLayoutProps {
  columns?: number
}
/**
 * Common base interface for any UI schema element.
 */
interface UISchemaElement<T> {
  /**
   * The type of this UI schema element.
   */
  type: string
  /**
   * An optional rule.
   */
  rule?: Rule<T>
}
/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
type LayoutUISchema<T> = UISchemaElement<T> & {
  /**
   * The child elements of this layout.
   */
  elements: UISchema<T>[]
}
/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 */
export type VerticalLayoutUISchema<T> = LayoutUISchema<T> & {
  type: "VerticalLayout"
}
/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface HorizontalLayoutUISchema<T> extends LayoutUISchema<T> {
  type: "HorizontalLayout"
  layoutProps?: ColumnLayoutProps
}
/**
 * A group resembles a vertical layout, but additionally might have a label.
 * This layout is useful when grouping different elements by a certain criteria.
 */
export type GroupLayoutUISchema<T> = BaseGroupLayoutUISchema<T> &
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

type BaseGroupLayoutUISchema<T> = LayoutUISchema<T> &
  Labelable & {
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
export type LabelLayoutUISchema<T> = UISchemaElement<T> & {
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

export const CombinatorSchemaSwitcherOptions = [
  "button",
  "dropdown",
  "radio",
  "segmented",
] as const

export type CombinatorSchemaSwitcherOption =
  (typeof CombinatorSchemaSwitcherOptions)[number]

export type OneOfControlOptions = {
  optionType?: CombinatorSchemaSwitcherOption
  required?: boolean
  subschemaTitleToLabelMap?: Record<string, string>
}

export type AnyOfControlOptions = OneOfControlOptions

export const EnumOptions = ["dropdown", "radio", "segmented"] as const

export type EnumOption = (typeof EnumOptions)[number]

export type EnumControlOptions = {
  optionType?: EnumOption
  enumValueToLabelMap?: Record<string | number, string>
}

export type TextControlType = "multiline" | "password" | "singleline"

export type TextControlOptions = {
  /**
   * @deprecated Please use formItemProps.tooltip instead
   */
  tooltip?: string
  placeholderText?: string
  required?: boolean
  rules?: AntDRule[]
} & (
  | {
      type?: "singleline"
      inputProps?: InputProps
    }
  | {
      type: "multiline"
      inputProps?: TextAreaProps
    }
  | {
      type: "password"
      inputProps?: InputProps
    }
)

/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export type ControlUISchemaLabel = Labelable<string | LabelDescription>
export type ControlUISchema<T> = UISchemaElement<T> &
  SchemaAwareScope<T> &
  ControlUISchemaLabel & {
    type: "Control"
    formItemProps?: FormItemProps
    layoutProps?: ColumnLayoutProps
  }
/**
 * The category layout.
 */
type CategoryUISchema<T> = LayoutUISchema<T> &
  Labeled & {
    type: "Category"
  }
/**
 * The categorization element, which may have children elements.
 * A child element may either be itself a Categorization or a Category, hence
 * the categorization element can be used to represent recursive structures like trees.
 */
type CategorizationUISchema<T> = UISchemaElement<T> &
  Labeled & {
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
type Rule<T> = {
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
type Condition<T> =
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
type LeafCondition<T> = JFCondition &
  SchemaAwareScope<T> & {
    type: "LEAF"
    /**
     * The expected value when evaluating the condition
     */
    expectedValue: unknown
  }

type SchemaBasedCondition<T> = JFCondition &
  SchemaAwareScope<T> & {
    schema: JsonSchema
  }
/**
 * A composable condition.
 */
type ComposableCondition<T> = JFCondition & {
  conditions: Condition<T>[]
}
/**
 * An or condition.
 */
type OrCondition<T> = ComposableCondition<T> & {
  type: "OR"
}
/**
 * An and condition.
 */
type AndCondition<T> = ComposableCondition<T> & {
  type: "AND"
}

export type AddButtonLocation = "top" | "bottom"

export type ArrayControlOptions = {
  addButtonProps?: ButtonProps
  removeButtonProps?: ButtonProps
  addButtonLocation?: AddButtonLocation
  showSortButtons?: boolean
  moveUpButtonProps?: ButtonProps
  moveDownButtonProps?: ButtonProps
}

export type NumericControlOptions = {
  addonBefore?: InputNumberProps["addonBefore"]
  addonAfter?: InputNumberProps["addonAfter"]
}
