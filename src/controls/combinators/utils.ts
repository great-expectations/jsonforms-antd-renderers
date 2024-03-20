import { OneOfControlOption } from "../../ui-schema"

export function shouldUseRadioGroupSwitcher(
  optionType: OneOfControlOption | undefined,
) {
  return (
    !optionType ||
    (["radio", "button"] satisfies OneOfControlOption[] as string[]).includes(
      optionType,
    )
  )
}
