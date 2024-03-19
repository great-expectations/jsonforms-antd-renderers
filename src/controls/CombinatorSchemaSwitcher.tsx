import {
  Radio,
  RadioChangeEvent,
  RadioGroupProps,
  Select,
  Space,
  Switch,
  Typography,
} from "antd"
import { OneOfControlOption, OneOfControlOptions } from "../ui-schema"
import merge from "lodash.merge"
import { useCallback, useEffect, useState } from "react"
import {
  CombinatorRendererProps,
  CombinatorSubSchemaRenderInfo,
  JsonSchema,
  createDefaultValue,
} from "@jsonforms/core"
import startCase from "lodash.startcase"
import { usePreviousValue } from "../common/usePreviousValue"

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
  const handleRadioChange = useCallback(
    (e: RadioChangeEvent) => {
      // not my fav way to do this but antd type for value is literally any
      const combinatorIndex = e.target.value as number
      setSelectedIndex(combinatorIndex)
    },
    [setSelectedIndex],
  )
  const handleSelectChange = useCallback(
    (value: number) => {
      const combinatorIndex = value
      setSelectedIndex(combinatorIndex)
    },
    [setSelectedIndex],
  )

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      const combinatorIndex = value === false ? 0 : 1
      setSelectedIndex(combinatorIndex)
    },
    [setSelectedIndex],
  )

  const computeLabel = (oneOfRenderInfo: CombinatorSubSchemaRenderInfo) => {
    const label = oneOfRenderInfo.label.startsWith("oneOf")
      ? oneOfRenderInfo.schema.title
      : oneOfRenderInfo.label
    return startCase(label)
  }

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

  if (shouldUseRadioGroupSwitcher(oneOfOptionType)) {
    return (
      <RadioGroupSwitcher
        radioProps={{
          style: { marginBottom: "12px" },
          ...(oneOfOptionType === "button"
            ? { optionType: "button", buttonStyle: "solid" }
            : {}),
        }}
        options={renderInfos.map((oneOfRenderInfo, index) => ({
          // revert this when this is merged & released: https://github.com/eclipsesource/jsonforms/pull/2165#issuecomment-1640981617
          label: computeLabel(oneOfRenderInfo),
          value: index,
        }))}
        onChange={handleRadioChange}
        value={selectedIndex}
      />
    )
  }
  if (oneOfOptionType === "dropdown") {
    return (
      <Select
        options={renderInfos.map((renderInfo, index) => ({
          // revert this when this is merged & released: https://github.com/eclipsesource/jsonforms/pull/2165#issuecomment-1640981617
          label: computeLabel(renderInfo),
          value: index,
        }))}
        onChange={handleSelectChange}
        defaultValue={selectedIndex}
      />
    )
  }
  if (oneOfOptionType === "toggle") {
    return (
      <Space>
        <Switch
          onChange={handleSwitchChange}
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

function shouldUseRadioGroupSwitcher(
  optionType: OneOfControlOption | undefined,
) {
  return (
    !optionType ||
    (["radio", "button"] satisfies OneOfControlOption[] as string[]).includes(
      optionType,
    )
  )
}

type RadioGroupSwitcherProps = {
  radioProps: Partial<RadioGroupProps>
  options: { label: string; value: number }[]
  onChange: (e: RadioChangeEvent) => void
  value: unknown
}

function RadioGroupSwitcher({
  radioProps,
  options,
  onChange,
  value,
}: RadioGroupSwitcherProps) {
  return (
    <Radio.Group
      {...radioProps}
      options={options}
      onChange={onChange}
      value={value}
    />
  )
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
