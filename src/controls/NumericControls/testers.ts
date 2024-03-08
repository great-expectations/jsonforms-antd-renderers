import { Tester, isNumberControl, isIntegerControl, or } from "@jsonforms/core"

export const isNumericControl: Tester = or(isNumberControl, isIntegerControl)
