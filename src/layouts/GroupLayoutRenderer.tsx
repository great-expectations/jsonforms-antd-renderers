import { GroupLayout, OwnPropsOfRenderer } from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { Divider } from "antd"
import { AntDLayoutRenderer } from "./LayoutRenderer"

export type LayoutRendererProps = OwnPropsOfRenderer & {
  elements: UISchema[]
}

export function GroupLayoutRenderer({
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
      <AntDLayoutRenderer
        {...props}
        visible={visible}
        enabled={enabled}
        elements={groupLayout.elements}
      />
      <Divider />
    </>
  )
}
