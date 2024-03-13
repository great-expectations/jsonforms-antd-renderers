import { Button as AntDButton, ButtonProps as AntDButtonProps } from "antd"

import React, { ForwardedRef } from "react"

function ButtonForwardRef(
  {
    type = "default",
    size,
    loading = false,
    disabled = false,
    danger = false,
    icon: iconName,
    title: _title,
    "aria-label": _ariaLabel,
    ...props
  }: AntDButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const iconOnly = Boolean(iconName && !props.children)
  const title = _title ?? _ariaLabel
  const ariaLabel = _ariaLabel ?? _title

  if (iconOnly && !title) {
    console.warn("Untitled icon button", iconName)
  }

  // const icon = iconName && !loading ? <Icon name={iconName} size={"14px"} disabled={disabled} /> : undefined

  const defaultIconStyles = iconOnly
    ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }
    : {
        textOverflow: "initial",
        overflow: "initial",
      }

  const styles = { icon: { ...defaultIconStyles, ...props.styles?.icon }, ...props.styles }

  return (
    <AntDButton
      ref={ref}
      type={type}
      size={size}
      loading={loading}
      disabled={disabled}
      danger={danger}
      // icon={icon}
      styles={styles}
      title={title}
      aria-label={ariaLabel}
      {...props}
    />
  )
}

const Button = React.forwardRef<HTMLButtonElement, AntDButtonProps>(ButtonForwardRef)

export { Button }
