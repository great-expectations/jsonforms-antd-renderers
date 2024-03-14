import { GroupLayout, OwnPropsOfRenderer } from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { Divider } from "antd"
import { AntDLayout } from "./LayoutRenderer"

export type LayoutRendererProps = OwnPropsOfRenderer & {
  elements: UISchema[]
}

export function GroupLayout({
  visible,
  enabled,
  uischema,
  ...props
}: LayoutRendererProps) {
  const groupLayout = uischema as GroupLayout
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
