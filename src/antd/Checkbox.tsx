import { CellProps, WithClassname, Helpers } from "@jsonforms/core"
import { Checkbox as AntDCheckbox } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox"

interface CheckboxProps extends CellProps, WithClassname {
  label?: string
}

export function Checkbox({ data, className, id, enabled, uischema, schema, path, handleChange, label } : CheckboxProps) {
  const checked = !!data // convert undefined to false

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema);
  const defaultLabel = labelDescription.show ? labelDescription.text : '';

  return (
    <AntDCheckbox
      checked={checked}
      onChange={(e: CheckboxChangeEvent) => {handleChange(path, e.target.checked)}}
      className={className}
      id={id}
      disabled={!enabled}
    >
      {label ?? defaultLabel}
    </AntDCheckbox>
  )
}
