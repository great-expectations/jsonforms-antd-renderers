import {
  CombinatorRendererProps as JSFCombinatorRendererProps,
  createCombinatorRenderInfos,
  JsonSchema,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react"
import { Form, Space } from "antd"
import { useState } from "react"
import { ControlUISchema } from "../../ui-schema"
import { ControlLabel } from "../../common/ControlLabel"
import { CombinatorSchemaSwitcher } from "./CombinatorSchemaSwitcher"

type CombinatorRendererProps = Omit<JSFCombinatorRendererProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFCombinatorRendererProps["uischema"]
}

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

  const oneOfRenderInfos = createCombinatorRenderInfos(
    schema.oneOf as JsonSchema[],
    rootSchema,
    "oneOf",
    uischema,
    path,
    uischemas,
  )

  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}

  return (
    <Form.Item
      required={required}
      label={uischema.label ? "" : schema.title}
      {...formItemProps}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {uischema.type === "Control" && uischema.label ? ( // I don't think it's possible for type to be other than "Control"
          // but until we improve the UISchema types a bit, it's hard to be sure
          <ControlLabel
            uischema={uischema as ControlUISchema<unknown>}
            schema={schema}
          />
        ) : null}
        <CombinatorSchemaSwitcher
          config={config as unknown}
          renderInfos={oneOfRenderInfos}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          uischema={uischema}
          path={path}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data={data}
          handleChange={handleChange}
          rootSchema={rootSchema}
        />
        {oneOfRenderInfos.map((renderInfo, index) => {
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
