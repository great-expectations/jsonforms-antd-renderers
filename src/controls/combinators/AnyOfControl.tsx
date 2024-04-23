/*
AnyOfControl should be used when a form item would control other elements within the same form
AnyOfRenderer does not have options to render the label as a title
*/
import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  Helpers,
  JsonSchema,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react"
import { Form, Space } from "antd"
import { useEffect, useState } from "react"
import { CombinatorSchemaSwitcher } from "./CombinatorSchemaSwitcher"

export function AnyOfControl({
  handleChange,
  data,
  schema,
  path,
  renderers,
  cells,
  rootSchema,
  indexOfFittingSchema,
  uischema,
  uischemas,
  config,
  required,
}: CombinatorRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0)

  const combinatorRenderInfos = createCombinatorRenderInfos(
    schema.anyOf as JsonSchema[],
    rootSchema,
    "anyOf",
    uischema,
    path,
    uischemas,
  )
  // this is what fixes the no-default-value-for-combinator bug
  const form = Form.useFormInstance()
  useEffect(() => {
    form.setFieldValue(`${path}.combinatorType`, selectedIndex)
    // intention is to run this just once on initial render so antd understands a default value has been selected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <Form.Item
        rules={[{ required: required, message: `${schema.title} is required` }]}
        name={`${path}.combinatorType`}
        label={labelDescription.show ? labelDescription.text : ""}
      >
        {combinatorSchemaSwitcher}
      </Form.Item>
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
  )
}

export const AnyOfRenderer = withJsonFormsOneOfProps(AnyOfControl)
