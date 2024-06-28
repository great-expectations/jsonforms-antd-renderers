import { FromSchema, JSONSchema } from "json-schema-to-ts"
import {
  AnyOfControlOptions,
  ArrayControlOptions,
  EnumControlOptions,
  NumericControlOptions,
  OneOfControlOptions,
  TextControlOptions,
  UISchema,
} from ".."

export type JSONFormData<T extends JSONSchema> = RecursivePartial<FromSchema<T>>
export type JSONData<T extends JSONSchema> = FromSchema<T>

type RecursivePartial<T> = T extends object
  ? { [K in keyof T]?: RecursivePartial<T[K]> }
  : T

type JsonSchemaTypeToControlOptions<
  T,
  // K extends keyof T & string,
> = T extends { enum: unknown }
  ? EnumControlOptions
  : T extends { type: infer U }
    ? U extends "object" // ObjectControlOptions goes here
      ? unknown
      : U extends "string"
        ? TextControlOptions
        : U extends "number" | "integer"
          ? NumericControlOptions
          : U extends "array"
            ? ArrayControlOptions
            : U extends "boolean"
              ? unknown // BooleanControlOptions goes here
              : unknown
    : T extends { anyOf: unknown }
      ? AnyOfControlOptions
      : T extends { oneOf: unknown }
        ? OneOfControlOptions
        : unknown

type IsControlProperty<T> = T extends  // is this a property we can apply a control to?
  | { enum: unknown }
  | { type: string }
  | { anyOf: unknown }
  | { oneOf: unknown }
  ? true
  : false

// This is a type called SchemaAwareScope that takes up to two type arguments
export type SchemaAwareScope<T = unknown> = T extends object
  ? _SchemaAwareScope<T> | TopLevelScope<T>
  : { scope: string; [key: string]: unknown }

type _SchemaAwareScope<T, Prefix extends string = ""> = {
  // let's define properties for each key in object type T
  [K in keyof T & string]: IsControlProperty<T[K]> extends true // is this a property we can apply a control to?
    ? // we can apply a control to it
      // does it have a typed options property? if this type extends object, that means T[K] is a property that has typed options, e.g. TextControlOptions
      JsonSchemaTypeToControlOptions<T[K]> extends object
      ? // it does have a typed options property, so we provide that type info
        {
          // it does have a typed options property, so this is the type
          scope: Prefix extends "" ? `#/${K}` : `${Prefix}/${K}`
          options?: JsonSchemaTypeToControlOptions<T[K]>
        }
      : // it doesn't have a typed options property
        // does it have properties of its own?
        T[K] extends { properties: unknown }
        ? // it does have properties of its own; let's union our type with a recursive call to SchemaAwareScope
          | {
                scope: Prefix extends "" ? `#/${K}` : `${Prefix}/${K}`
              }
            | _SchemaAwareScope<
                T[K],
                Prefix extends "" ? `#/${K}` : `${Prefix}/${K}`
              >
        : // it doesn't have properties of its own, let's provide the type:
          {
            scope: Prefix extends "" ? `#/${K}` : `${Prefix}/${K}`
          }
    : K extends "properties" // is our key the "properties" key?
      ? // it is, so make a recursive call for all the properties
        _SchemaAwareScope<T[K], Prefix extends "" ? `#/${K}` : `${Prefix}/${K}`>
      : // it isn't, so let's exclude this path and property from our type
        never
}[keyof T & string] // make this type a union of the properties of the object type we created

type TopLevelScope<T> =
  IsControlProperty<T> extends true
    ? JsonSchemaTypeToControlOptions<T> extends object
      ? // it does have a typed options property, so we provide that type info
        {
          // it does have a typed options property, so this is the type
          scope: "#"
          options?: JsonSchemaTypeToControlOptions<T>
        }
      : { scope: "#" }
    : unknown

export const TopLevelTest1: SchemaAwareScope<typeof objectSchema> = {
  scope: "#",
}
export const TopLevelTest2: SchemaAwareScope<
  typeof arraySchema.properties.list
> = {
  scope: "#",
}

export const ObjectUISchema: SchemaAwareScope<typeof objectSchema> = {
  scope: "#/properties/person",
}
export const ObjectUISchema1: SchemaAwareScope<typeof objectSchema> = {
  // @ts-expect-error this object is a test to ensure that "properties" is an invalid value for scope
  scope: "properties",
}

export const ObjectUISchema2: SchemaAwareScope<typeof objectSchema> = {
  scope: "#/properties/person/properties/name",
  options: { rules: [] },
}

export const ObjectUISchema3: SchemaAwareScope<typeof objectSchema> = {
  scope: "#/properties/person/properties/name",
}

export const OneOfUISchema: UISchema<typeof oneOfSchema> = {
  type: "Control",
  scope: "#/properties/person",
  options: { optionType: "button" },
}

const arraySchema = {
  type: "object",
  properties: {
    list: {
      title: "LIST",
      default: [],
      type: "array",
      items: { oneOf: [{ type: "string" }] },
    },
  },
} as const satisfies JSONSchema

export const Test: UISchema<typeof arraySchema> = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/list",
      label: "ASset",
      options: {},
    },
  ],
}

export const objectSchema = {
  type: "object",
  properties: {
    person: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
  },
} satisfies JSONSchema

export const oneOfSchema = {
  type: "object",
  properties: {
    person: {
      oneOf: [
        {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
      ],
    },
  },
} satisfies JSONSchema
