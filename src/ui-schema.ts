
import { JsonSchema } from "@jsonforms/core";
import { ButtonProps, InputNumberProps, AlertProps } from "antd";


// jsonforms has composed their types in such a way that recursive types only specify the "base" type
// this type is intended to fix that problem in the short term so that we can have strong type checking
// on ui schema configurations
// long-term solutions include but are not limited to: making a PR against their repo

export type UISchema =
  | UISchemaElement
  | Layout
  | VerticalLayout
  | HorizontalLayout
  | LabelElement
  | GroupLayout
  | ControlElement
  | Categorization
  | Category;

/**
 * Interface for describing an UI schema element that is referencing
 * a subschema. The value of the scope may be a JSON Pointer.
 */
interface Scopable {
  /**
   * The scope that determines to which part this element should be bound to.
   */
  scope?: string;
}
/**
 * Interface for describing an UI schema element that is referencing
 * a subschema. The value of the scope must be a JSON Pointer.
 */
interface Scoped extends Scopable {
  /**
   * The scope that determines to which part this element should be bound to.
   */
  scope: string;
}
/**
 * Interface for describing an UI schema element that may be labeled.
 */
interface Labelable<T = string> {
  /**
   * Label for UI schema element.
   */
  label?: string | T;
}
/**
 * Interface for describing an UI schema element that is labeled.
 */
interface Labeled<T = string> extends Labelable<T> {
  label: string | T;
}
interface Internationalizable {
  i18n?: string;
}
/**
 * Common base interface for any UI schema element.
 */
interface UISchemaElement<TOptions = { [key: string]: unknown }> {
  /**
   * The type of this UI schema element.
   */
  type: string;
  /**
   * An optional rule.
   */
  rule?: Rule;
  /**
   * Any additional options.
   */
  options?: TOptions;
}
/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
interface Layout extends UISchemaElement {
  /**
   * The child elements of this layout.
   */
  elements: UISchema[];
}
/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 */
export interface VerticalLayout extends Layout {
  type: "VerticalLayout";
}
/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface HorizontalLayout extends Layout {
  type: "HorizontalLayout";
}
/**
 * A group resembles a vertical layout, but additionally might have a label.
 * This layout is useful when grouping different elements by a certain criteria.
 */
interface GroupLayout extends Layout, Labelable, Internationalizable {
  type: "Group";
}
/**
 * Represents an object that can be used to configure a label.
 */
interface LabelDescription {
  /**
   * An optional text to be displayed.
   */
  text?: string;
  /**
   * Optional property that determines whether to show this label.
   */
  show?: boolean;
}
/**
 * A label element.
 */
export interface LabelElement extends UISchemaElement, Internationalizable {
  type: "Label";
  /**
   * The text of label.
   */
  text: string;
  options?: LabelOptions;
}

export type AlertLabelOptions = { type: AlertProps["type"] };

// this is intended to be a union, it just has one member rn
export type LabelOptions = AlertLabelOptions;

export const OneOfControlOptions = [
  "button",
  "dropdown",
  "radio",
  "toggle",
] as const


export type OneOfControlOption = (typeof OneOfControlOptions)[number];

export type OneOfControlOptions = {
  optionType?: OneOfControlOption;
  toggleLabel?: string;
};

export type TextControlType = "multiline" | "singleline";

export type TextControlOptions = {
  type?: TextControlType;
  tooltip?: string;
  placeholderText?: string;
  required?: boolean;
};

export type AnyOfControlOptions = {
  optionType?: AnyOfControlOption;
  required?: boolean;
};

export const AnyOfControlOptions = ["button", "dropdown", "radio"] as const;
export type AnyOfControlOption = (typeof AnyOfControlOptions)[number];

type ControlOptions =
  | OneOfControlOptions
  | TextControlOptions
  | AnyOfControlOptions


/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export interface ControlElement
  extends UISchemaElement<ControlOptions>,
    Scoped,
    Labelable<string | boolean | LabelDescription>,
    Internationalizable {
  type: "Control";
}
/**
 * The category layout.
 */
interface Category extends Layout, Labeled, Internationalizable {
  type: "Category";
}
/**
 * The categorization element, which may have children elements.
 * A child element may either be itself a Categorization or a Category, hence
 * the categorization element can be used to represent recursive structures like trees.
 */
interface Categorization extends UISchemaElement, Labeled, Internationalizable {
  type: "Categorization";
  /**
   * The child elements of this categorization which are either of type
   * {@link Category} or {@link Categorization}.
   */
  elements: (Category | Categorization)[];
}

/**
 * A rule that may be attached to any UI schema element.
 */
interface Rule {
  /**
   * The effect of the rule
   */
  effect: RuleEffect;
  /**
   * The condition of the rule that must evaluate to true in order
   * to trigger the effect.
   */
  condition: Condition;
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
type Condition =
  | Record<string, never> // not documented in their type system AFAIK, but this is how you default a rule to "always true"
  | (
      | JFCondition
      | LeafCondition
      | SchemaBasedCondition
      | OrCondition
      | AndCondition
  )


interface JFCondition {
  /**
   * The type of condition.
   */
  readonly type?: string;
}
/**
 * A leaf condition.
 */
type LeafCondition = JFCondition &
  Scoped & {
    type: "LEAF";
    /**
     * The expected value when evaluating the condition
     */
    expectedValue: unknown;
  };
type SchemaBasedCondition = JFCondition &
  Scoped & {
    schema: JsonSchema;
  };
/**
 * A composable condition.
 */
type ComposableCondition = JFCondition & {
  conditions: Condition[];
};
/**
 * An or condition.
 */
type OrCondition = ComposableCondition & {
  type: "OR";
};
/**
 * An and condition.
 */
type AndCondition = ComposableCondition & {
  type: "AND";
};

export type AddButtonLocation = "top" | "bottom";

export interface ArrayControlOptions {
  addButtonProps?: ButtonProps;
  removeButtonProps?: ButtonProps;
  addButtonLocation?: AddButtonLocation;
}

export type InputNumberOptions = {
  addonBefore?: InputNumberProps["addonBefore"]
  addonAfter?: InputNumberProps["addonAfter"]
}
