import { LabelProps, RendererProps } from "@jsonforms/core"
import { Alert } from "antd"
import { AlertLayoutOptions } from "../ui-schema"
import { withJsonFormsLabelProps } from "@jsonforms/react"
import ReactMarkdown from "react-markdown"

export function AlertLayout({ text, uischema }: LabelProps & RendererProps) {
  const options = uischema.options as AlertLayoutOptions
  return (
    <Alert
      style={{ marginBottom: "24px", borderWidth: 0, padding: "12px" }}
      type={options?.type ?? "info"}
      description={
        <ReactMarkdown
          components={{
            p(props) {
              return <span {...props} />
            },
            a(props) {
              return (
                <a
                  style={{ textDecoration: "underline", color: "inherit" }}
                  href={props.href}
                  title={props.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {props.children}
                </a>
              )
            },
          }}
        >
          {text ?? ""}
        </ReactMarkdown>
      }
    />
  )
}

export const AlertLayoutRenderer = withJsonFormsLabelProps(AlertLayout)
