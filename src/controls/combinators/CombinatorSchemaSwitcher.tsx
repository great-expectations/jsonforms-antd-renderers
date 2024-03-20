import {
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Switch,
  Typography,
} from "antd"
import { OneOfControlOptions } from "../../ui-schema"
import merge from "lodash.merge"
import { useEffect, useState } from "react"
import {
  CombinatorRendererProps,
  CombinatorSubSchemaRenderInfo,
  JsonSchema,
  createDefaultValue,
} from "@jsonforms/core"
import { usePreviousValue } from "../../common/usePreviousValue"
import { shouldUseRadioGroupSwitcher } from "./utils"

type CombinatorSchemaSwitcherProps = {
  renderInfos: CombinatorSubSchemaRenderInfo[]
  setSelectedIndex: (index: number) => void
  selectedIndex: number
} & Pick<
  CombinatorRendererProps,
  | "data"
  | "handleChange"
  | "path"
  | "rootSchema"
  | "uischema"
  | "config"
  | "indexOfFittingSchema"
>

export function CombinatorSchemaSwitcher({
  renderInfos,
  indexOfFittingSchema,
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
  const prevSelectedIndex = usePreviousValue(selectedIndex)
  const [dataForPreviousSchemas, setDataForPreviousSchemas] = useState<
    Record<number, unknown>
  >({})

  useEffect(() => {
    if (
      selectedIndex !== prevSelectedIndex &&
      prevSelectedIndex !== undefined
    ) {
      setDataForPreviousSchemas({
        ...dataForPreviousSchemas,
        [prevSelectedIndex]: data as unknown,
      })
      if (dataForPreviousSchemas[selectedIndex]) {
        handleChange(path, dataForPreviousSchemas[selectedIndex])
      } else {
        handleCombinatorTypeChange({
          handleChange,
          combinatorIndex: selectedIndex,
          renderInfos,
          path,
          rootSchema,
        })
      }
    }
  }, [
    data,
    dataForPreviousSchemas,
    handleChange,
    renderInfos,
    path,
    prevSelectedIndex,
    rootSchema,
    selectedIndex,
  ])

  const options = renderInfos.map((renderInfo, index) => ({
    label: renderInfo.label,
    value: index,
  }))

  if (shouldUseRadioGroupSwitcher(oneOfOptionType)) {
    return (
      <Radio.Group
        {...(oneOfOptionType === "button" && {
          optionType: "button",
          buttonStyle: "solid",
        })}
        options={options}
        onChange={(e: RadioChangeEvent) => {
          const combinatorIndex = e.target.value as number
          setSelectedIndex(combinatorIndex)
        }}
        value={selectedIndex}
      />
    )
  }
  if (oneOfOptionType === "dropdown") {
    return (
      <Select
        options={options}
        onChange={(combinatorIndex: number) =>
          setSelectedIndex(combinatorIndex)
        }
        defaultValue={selectedIndex}
      />
    )
  }
  if (oneOfOptionType === "toggle") {
    return (
      <Space>
        <Switch
          onChange={(value: boolean) => {
            const combinatorIndex = value === false ? 0 : 1
            setSelectedIndex(combinatorIndex)
          }}
          defaultChecked={indexOfFittingSchema === 1}
        />
        {appliedUiSchemaOptions.toggleLabel && (
          <Typography.Text>
            {appliedUiSchemaOptions.toggleLabel}
          </Typography.Text>
        )}
      </Space>
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
