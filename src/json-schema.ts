import { FromSchema, JSONSchema } from "json-schema-to-ts"

export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T
export type FormData<T extends JSONSchema> = RecursivePartial<FromSchema<T>>