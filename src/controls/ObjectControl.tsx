import { useMemo } from "react"
import {
  findUISchema,
  Generate,
  StatePropsOfControlWithDetail,
} from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
import isEmpty from "lodash.isempty"

export function ObjectControl({
  renderers,
  cells,
  uischemas,
  schema,
  label,
  path,
  visible,
  enabled,
  uischema,
  rootSchema,
}: StatePropsOfControlWithDetail) {
  const detailUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas ?? [],
        schema,
        uischema.scope,
        path,
        () =>
          isEmpty(path)
            ? Generate.uiSchema(schema, "VerticalLayout")
            : { ...Generate.uiSchema(schema, "Group"), label },
        uischema,
        rootSchema,
      ),
    [uischemas, schema, path, label, uischema, rootSchema],
  )

  if (!visible) {
    return null
  }

  return (
    <JsonFormsDispatch
      visible={visible}
      uischemas={uischemas}
      enabled={enabled}
      schema={schema}
      uischema={detailUiSchema}
      path={path}
      renderers={renderers}
      cells={cells}
    />
  )
}
