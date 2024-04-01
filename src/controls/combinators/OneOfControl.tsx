import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  JsonSchema,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react"
import { Space } from "antd"
import { useState } from "react"
import { ControlUISchema } from "../../ui-schema"
import { ControlLabel } from "../../common/ControlLabel"
import { CombinatorSchemaSwitcher } from "./CombinatorSchemaSwitcher"

export function OneOfControl({
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
}: CombinatorRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0)

  const combinatorType = "oneOf"
  const oneOfRenderInfos = createCombinatorRenderInfos(
    schema.oneOf as JsonSchema[],
    rootSchema,
    combinatorType,
    uischema,
    path,
    uischemas,
  )

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {uischema.type === "Control" && ( // I don't think it's possible for this to be false
        // but until we improve the UISchema types a bit, it's hard to be sure
        <ControlLabel
          uischema={uischema as ControlUISchema<unknown>}
          schema={schema}
        />
      )}
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
      {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => {
        return (
          selectedIndex === oneOfIndex && (
            <JsonFormsDispatch
              key={oneOfIndex}
              schema={oneOfRenderInfo.schema}
              uischemas={uischemas}
              uischema={oneOfRenderInfo.uischema}
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

export const OneOfRenderer = withJsonFormsOneOfProps(OneOfControl)
