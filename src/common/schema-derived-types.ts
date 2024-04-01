/* eslint-disable @typescript-eslint/no-unused-vars */
import { FromSchema, JSONSchema } from "json-schema-to-ts"
import {
  AnyOfControlOptions,
  ArrayControlOptions,
  NumericControlOptions,
  OneOfControlOptions,
  TextControlOptions,
} from ".."

export type JSONFormData<T extends JSONSchema> = RecursivePartial<FromSchema<T>>
export type JSONData<T extends JSONSchema> = FromSchema<T>

type RecursivePartial<T> = T extends object
  ? { [K in keyof T]?: RecursivePartial<T[K]> }
  : T

type _Paths<T extends object> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}/${_Paths<T[K]>}`
    : `${K}`
}[keyof T & (string | number)]

export type Paths<T extends object> = `#/${_Paths<T>}`

type AllPaths = _Paths<typeof objectSchema>

type UnwrapPath<T> = T extends `#/${infer U}` ? U : T

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

type JsonSchemaTypeToControlOptions<
  T,
  K extends keyof T & string,
> = T[K] extends { type: infer U }
  ? U extends "string"
    ? TextControlOptions
    : U extends "number" | "integer"
      ? NumericControlOptions
      : U extends "array"
        ? ArrayControlOptions
        : unknown
  : T[K] extends { anyOf: unknown }
    ? AnyOfControlOptions
    : T[K] extends { oneOf: unknown }
      ? OneOfControlOptions
      : unknown

type NewUISchema<T, Prefix extends string = ""> = {
  // let's define properties for each key in object type T
  [K in keyof T & string]: T[K] extends  // is this a property we can apply a control to?
    | { type: string }
    | { anyOf: unknown }
    | { oneOf: unknown }
    ? // we can apply a control to it
      // does it have a typed options property? if this type extends object, that means T[K] is a property that has typed options, e.g. TextControlOptions
      JsonSchemaTypeToControlOptions<T, K> extends object
      ? // it does have a typed options property, so we provide that type info
        {
          // it does have a typed options property, so this is the type
          scope: Prefix extends "" ? `${K}` : `${Prefix}/${K}`
          options?: JsonSchemaTypeToControlOptions<T, K>
        }
      : // it doesn't have a typed options property
        // does it have properties of its own?
        T[K] extends { properties: unknown }
        ? // it does have properties of its own; let's union our type with a recursive call to NewUISchema
          | {
                scope: Prefix extends "" ? `${K}` : `${Prefix}/${K}`
              }
            | NewUISchema<T[K], Prefix extends "" ? `${K}` : `${Prefix}/${K}`>
        : // it doesn't have properties of its own, let's provide the type:
          {
            scope: Prefix extends "" ? `${K}` : `${Prefix}/${K}`
          }
    : K extends "properties" // is our key the "properties" key?
      ? // it is, so make a recursive call for all the properties
        NewUISchema<T[K], Prefix extends "" ? `${K}` : `${Prefix}/${K}`>
      : // it isn't, so let's exclude this path and property from our type
        never
}[keyof T & string] // make this type a union of the properties of the object type we created

const ObjectUISchema: NewUISchema<typeof objectSchema> = {
  scope: "properties/person",
}
const ObjectUISchema1: NewUISchema<typeof objectSchema> = {
  scope: "properties",
}

const ObjectUISchema2: NewUISchema<typeof objectSchema> = {
  scope: "properties/person/properties/name",
  options: { rules: [] },
}

const ObjectUISchema3: NewUISchema<typeof objectSchema> = {
  scope: "properties/person/properties/name",
}

const OneOfUISchema: NewUISchema<typeof oneOfSchema> = {
  scope: "properties/person",
  options: { optionType: "button" },
}
