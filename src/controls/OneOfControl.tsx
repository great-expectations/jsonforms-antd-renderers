import {
  CombinatorRendererProps,
  CombinatorSubSchemaRenderInfo,
  createCombinatorRenderInfos,
  createDefaultValue,
  JsonSchema,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react"
import {
  Radio,
  RadioChangeEvent,
  RadioGroupProps,
  Select,
  Space,
  Switch,
  Typography,
} from "antd"
import merge from "lodash.merge"
import startCase from "lodash.startcase"
import { useCallback, useEffect, useState } from "react"
import {
  ControlUISchema,
  LabelDescription,
  OneOfControlOption,
  OneOfControlOptions,
  UISchema,
} from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import { assertNever } from "../common/assert-never"

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
  const appliedUiSchemaOptions: OneOfControlOptions = merge(
    {},
    config as unknown,
    uischema.options as Record<string, unknown>,
  ) as OneOfControlOptions
  const oneOfOptionType = appliedUiSchemaOptions.optionType
  const handleRadioChange = useCallback((e: RadioChangeEvent) => {
    // not my fav way to do this but antd type for value is literally any
    const combinatorIndex = e.target.value as number
    setSelectedIndex(combinatorIndex)
  }, [])
  const handleSelectChange = useCallback((value: number) => {
    const combinatorIndex = value
    setSelectedIndex(combinatorIndex)
  }, [])

  const handleSwitchChange = useCallback((value: boolean) => {
    const combinatorIndex = value === false ? 0 : 1
    setSelectedIndex(combinatorIndex)
  }, [])

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
          renderInfos: oneOfRenderInfos,
          path,
          rootSchema,
        })
      }
    }
  }, [
    data,
    dataForPreviousSchemas,
    handleChange,
    oneOfRenderInfos,
    path,
    prevSelectedIndex,
    rootSchema,
    selectedIndex,
  ])

  const computeLabel = (oneOfRenderInfo: CombinatorSubSchemaRenderInfo) => {
    const label = oneOfRenderInfo.label.startsWith("oneOf")
      ? oneOfRenderInfo.schema.title
      : oneOfRenderInfo.label
    return startCase(label)
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <CombinatorTitle uischema={uischema} schema={schema} />
      {shouldUseRadioGroupSwitcher(oneOfOptionType) && (
        <RadioGroupSwitcher
          radioProps={{
            style: { marginBottom: "12px" },
            ...(oneOfOptionType === "button"
              ? { optionType: "button", buttonStyle: "solid" }
              : {}),
          }}
          options={oneOfRenderInfos.map((oneOfRenderInfo, index) => ({
            // revert this when this is merged & released: https://github.com/eclipsesource/jsonforms/pull/2165#issuecomment-1640981617
            label: computeLabel(oneOfRenderInfo),
            value: index,
          }))}
          onChange={handleRadioChange}
          value={selectedIndex}
        />
      )}
      {oneOfOptionType === "dropdown" && (
        <Select
          options={oneOfRenderInfos.map((oneOfRenderInfo, index) => ({
            // revert this when this is merged & released: https://github.com/eclipsesource/jsonforms/pull/2165#issuecomment-1640981617
            label: computeLabel(oneOfRenderInfo),
            value: index,
          }))}
          onChange={handleSelectChange}
          defaultValue={selectedIndex}
        />
      )}
      {oneOfOptionType === "toggle" && (
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
      )}
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

function CombinatorTitle({
  uischema,
  schema,
}: {
  uischema: UISchema
  schema: JsonSchema
}) {
  if (uischema.type !== "Control") {
    return null
  }
  const controlUISchema: ControlUISchema = uischema as ControlUISchema
  const text = getCombinatorUiSchemaLabel(controlUISchema)
  if (!text && !schema.title) {
    return null
  }
  if (!text && schema.title) {
    return <Typography.Title>{schema.title}</Typography.Title>
  }
  if (typeof controlUISchema.label === "object" && controlUISchema.label.type) {
    const labelType = controlUISchema.label.type
    switch (labelType) {
      case "Text":
        return (
          <Typography.Text {...controlUISchema.label.textProps}>
            {text}
          </Typography.Text>
        )

      case "Title":
        return (
          <Typography.Title {...controlUISchema.label.titleProps}>
            {text}
          </Typography.Title>
        )
      default:
        try {
          assertNever(labelType)
        } catch (e) {
          console.error(`Invalid value configured in UI Schema for label.type: '${labelType as string}'`)
        }
    }
  }
  return <Typography.Title>{text}</Typography.Title>
}

function getCombinatorUiSchemaLabel(
  uischema: ControlUISchema,
): string | undefined {
  const label = uischema.label
  if (!label) {
    return undefined
  }
  if (
    (label as LabelDescription).text &&
    (label as LabelDescription).show !== false
  ) {
    return (label as LabelDescription).text
  }
  if (typeof label === "string") {
    return label
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
