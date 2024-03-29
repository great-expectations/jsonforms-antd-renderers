import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  JsonSchema,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react"
import { Form, Space } from "antd"
import { useState } from "react"
import { ControlUISchema } from "../../ui-schema"
import { ControlLabel } from "../../common/ControlLabel"
import { CombinatorSchemaSwitcher } from "./CombinatorSchemaSwitcher"

export function OneOfControl({
  handleChange,
  data,
  required,
  schema,
  path,
  renderers,
  cells,
  rootSchema,
  indexOfFittingSchema,
  uischema,
  uischemas,
  config,
}: CombinatorRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0)

  const combinatorRenderInfos = createCombinatorRenderInfos(
    schema.oneOf as JsonSchema[],
    rootSchema,
    "oneOf",
    uischema,
    path,
    uischemas,
  )

  const combinatorSchemaSwitcher = (
    <CombinatorSchemaSwitcher
      config={config as unknown}
      renderInfos={combinatorRenderInfos}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      uischema={uischema}
      path={path}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data={data}
      handleChange={handleChange}
      rootSchema={rootSchema}
    />
  )

  return (
    <Form.Item required={required} label={uischema.label ? "" : schema.title}>
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {uischema.label ? (
          <ControlLabel
            uischema={uischema as ControlUISchema}
            schema={schema}
          />
        ) : null}
        {combinatorSchemaSwitcher}
        {combinatorRenderInfos.map((renderInfo, index) => {
          return (
            selectedIndex === index && (
              <JsonFormsDispatch
                key={index}
                schema={renderInfo.schema}
                uischemas={uischemas}
                uischema={renderInfo.uischema}
                path={path}
                renderers={renderers}
                cells={cells}
              />
            )
          )
        })}
      </Space>
    </Form.Item>
  )
}

export const OneOfRenderer = withJsonFormsOneOfProps(OneOfControl)
