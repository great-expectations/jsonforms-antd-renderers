import { Radio, RadioChangeEvent, Segmented, Select } from "antd"
import { OneOfControlOptions } from "../../ui-schema"
import merge from "lodash.merge"
import { useState } from "react"
import {
  CombinatorRendererProps,
  CombinatorSubSchemaRenderInfo,
  JsonSchema,
  createDefaultValue,
} from "@jsonforms/core"

type CombinatorSchemaSwitcherProps = {
  renderInfos: CombinatorSubSchemaRenderInfo[]
  setSelectedIndex: (index: number) => void
  selectedIndex: number
} & Pick<
  CombinatorRendererProps,
  "data" | "handleChange" | "path" | "rootSchema" | "uischema" | "config"
>

export function CombinatorSchemaSwitcher({
  renderInfos,
  config,
  uischema,
  setSelectedIndex,
  selectedIndex,
  rootSchema,
  path,
  handleChange,
  data,
}: CombinatorSchemaSwitcherProps) {
  const appliedUiSchemaOptions: OneOfControlOptions = merge(
    {},
    config,
    uischema.options as Record<string, unknown>,
  ) as OneOfControlOptions
  const oneOfOptionType = appliedUiSchemaOptions.optionType
  const labelMap = appliedUiSchemaOptions.subschemaTitleToLabelMap
  const prevSelectedIndex = usePreviousValue(selectedIndex)
  const [dataForPreviousSchemas, setDataForPreviousSchemas] = useState<
    Record<number, unknown>
  >({})

  const updateDataForPreviousSchemas = () => {
    setDataForPreviousSchemas({
      ...dataForPreviousSchemas,
      [selectedIndex]: data as unknown,
    })
  }

  const onChange = (combinatorIndex: number) => {
    updateDataForPreviousSchemas()
    setSelectedIndex(combinatorIndex)
    if (dataForPreviousSchemas[combinatorIndex]) {
      handleChange(path, dataForPreviousSchemas[combinatorIndex])
    } else {
      handleCombinatorTypeChange({
        handleChange,
        combinatorIndex: combinatorIndex,
        renderInfos,
        path,
        rootSchema,
      })
    }
  }

  const options = renderInfos.map((renderInfo, index) => ({
    label: labelMap?.[renderInfo.label] ?? renderInfo.label,
    value: index,
  }))

  switch (oneOfOptionType) {
    case "button":
      return (
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={options}
          onChange={(e: RadioChangeEvent) => {
            const combinatorIndex = e.target.value as number
            onChange(combinatorIndex)
          }}
          value={selectedIndex}
        />
      )
    case "dropdown":
      return (
        <Select
          options={options}
          onChange={onChange}
          defaultValue={selectedIndex}
        />
      )
    case "segmented":
      return (
        <Segmented
          options={options}
          onChange={onChange}
          value={selectedIndex}
        />
      )
    case "radio":
    default:
      return (
        <Radio.Group
          options={options}
          onChange={(e: RadioChangeEvent) => {
            const combinatorIndex = e.target.value as number
            onChange(combinatorIndex)
          }}
          value={selectedIndex}
        />
      )
  }
}

type HandleCombinatorTypeChangeArgs = {
  handleChange: (path: string, data: unknown) => void
  renderInfos: CombinatorSubSchemaRenderInfo[]
  combinatorIndex: number
  path: string
  rootSchema: JsonSchema
}

function handleCombinatorTypeChange({
  handleChange,
  renderInfos,
  combinatorIndex,
  path,
  rootSchema,
}: HandleCombinatorTypeChangeArgs) {
  const newSchema = renderInfos[combinatorIndex]?.schema
  let newData
  if (newSchema?.type === "object") {
    // const typeDiscriminator = newSchema.properties?.type?.default

    newData = {
      ...createDefaultValue(newSchema, rootSchema),
      // ...(typeDiscriminator ? { type: typeDiscriminator } : {}),
    } as unknown
  } else {
    newData = createDefaultValue(newSchema, rootSchema) as unknown
  }

  handleChange(path, newData)
}
