import { FromSchema, JSONSchema } from "json-schema-to-ts"

export type JSONFormData<T extends JSONSchema> = RecursivePartial<FromSchema<T>>
export type JSONData<T extends JSONSchema> = FromSchema<T>

type RecursivePartial<T> = T extends object
  ? { [K in keyof T]?: RecursivePartial<T[K]> }
  : T
