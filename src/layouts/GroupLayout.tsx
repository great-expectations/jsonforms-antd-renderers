import { OwnPropsOfRenderer } from "@jsonforms/core"
import { UISchema, GroupLayoutUISchema } from "../ui-schema"
import { Card, Divider } from "antd"
import { AntDLayout } from "./LayoutRenderer"
import React from "react"
import { assertNever } from "../common/assert-never"

export type LayoutRendererProps = OwnPropsOfRenderer & {
  elements: UISchema[]
}

export function GroupLayout({
  visible,
  enabled,
  uischema,
  ...props
}: LayoutRendererProps) {
  const groupLayout = uischema as GroupLayoutUISchema
  const type = groupLayout.groupType
  switch (type) {
    case "Card":
      return (
        <Card {...groupLayout.cardProps}>
          {groupLayout?.label && <b>{groupLayout.label}</b>}
          <AntDLayout
            {...props}
            visible={visible}
            enabled={enabled}
            elements={groupLayout.elements}
          />
        </Card>
      )
    case "Divider":
      return (
        <>
          <Divider {...groupLayout.topDividerProps} />
          {groupLayout?.label && <b>{groupLayout.label}</b>}
          <AntDLayout
            {...props}
            visible={visible}
            enabled={enabled}
            elements={groupLayout.elements}
          />
          <Divider {...groupLayout.bottomDividerProps} />
        </>
      )
    case undefined:
      break
    default:
      try {
        assertNever(type)
      } catch (e) {
        console.error(
          `Invalid value configured in GroupLayout UI Schema for groupType: '${type as string}'`,
        )
      }
  }
  return (
    <>
      <Divider />
      {groupLayout?.label && <b>{groupLayout.label}</b>}
      <AntDLayout
        {...props}
        visible={visible}
        enabled={enabled}
        elements={groupLayout.elements}
      />
      <Divider />
    </>
  )
}

export const GroupLayoutRenderer = React.memo(GroupLayout)
