/*
AnyOfControl should be used when a form item would control other elements within the same form
AnyOfRenderer does not have options to render the label as a title
*/
import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  createDefaultValue,
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
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema ?? 0)

  const combinatorRenderInfos = createCombinatorRenderInfos(
    schema.anyOf as JsonSchema[],
    rootSchema,
    "anyOf",
    uischema,
    path,
    uischemas,
  )

  const [renderCount, setRenderCount] = useState(1)

  useEffect(() => {
    // this is a janky workaround for two problems
    // 1) we need a more mature method of handling default value creation (possibly via middleware)
    //    bc doing it in the view layer isn't ideal
    // 2) there's some kind of bug in @jsonforms/react that causes the first call to
    //    handleChange to be ignored: https://jsonforms.discourse.group/t/updating-on-custom-renderer-load/1984
    //    need to file a MRE and add it here
    if (data === undefined && renderCount === 2) {
      setRenderCount(3)
      const newSchema = combinatorRenderInfos[selectedIndex]?.schema
      if (!newSchema) {
        handleChange(path, {})
      } else {
        const newData = createDefaultValue(newSchema, rootSchema) as unknown
        handleChange(path, newData)
      }
    }
    if (renderCount === 1) {
      setRenderCount(2)
    }
  }, [
    data,
    renderCount,
    combinatorRenderInfos,
    selectedIndex,
    handleChange,
    path,
    rootSchema,
  ])

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <Form.Item
        rules={[{ required, message: `${schema.title} is required` }]}
        label={labelDescription.show ? labelDescription.text : ""}
      >
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
