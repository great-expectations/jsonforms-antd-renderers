[![codecov](https://codecov.io/gh/great-expectations/jsonforms-antd-renderers/graph/badge.svg?token=aDz1isILuA)](https://codecov.io/gh/great-expectations/jsonforms-antd-renderers)

# Ant Design Renderers for `jsonforms`

[jsonforms](jsonforms.io) is "a declarative framework for efficiently building form-based web UIs." `jsonforms` has multiple renderer packages for different frameworks and component libraries, and this is one such package.

## Storybook

This package includes a storybook to help you see the different renderers in action. To run the storybook:

```bash
$ pnpm storybook
```

To view the published storybook, visit [https://great-expectations.github.io/jsonforms-antd-renderers/](https://great-expectations.github.io/jsonforms-antd-renderers/)

## Getting started

```bash
$ npm install @great-expectations/jsonforms-antd-renderers
```

### Using AntD Renderers

In order to use this package you need to import the renderer registry entries from this package and provide them to the `@jsonforms/react` `JsonForms` component:

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "@great-expectations/jsonforms-antd-renderers"

function MyForm() {
  return (
    <JsonForms
      schema={schema}
      renderers={rendererRegistryEntries}
      cells={cellRegistryEntries}
    />
  )
}
```

### Writing UISchemas

This package expands upon the types and configurability of [jsonforms UISchemas](https://jsonforms.io/docs/uischema). When writing UISchemas, you'll want to provide your jsonschema's type to our `UISchema` type to take advantage of advanced typechecking & UI configurability. See our storybooks (instructions for running storybooks under `Contributing`) for more examples.

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "@great-expectations/jsonforms-antd-renderers"

const schema = {
  type: "object",
  properties: { password: { type: "string" } },
}

const uischema: UISchema<typeof schema> = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/password",
      // properties like type: "password" here are unique to this renderer package. This allows you more declarative control over how your forms
      // render. In this case, the password field will be rendered with AntD's password input component
      options: { type: "password" },
    },
  ],
}

function MyForm() {
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      renderers={rendererRegistryEntries}
      cells={cellRegistryEntries}
    />
  )
}
```

### Form Validation & Submission

Here's a somewhat minimal example showing how to validate & save a form on form submission

```tsx
import { useCallback, useState } from "react"
import { Form, Button } from "antd"
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "@great-expectations/jsonforms-antd-renderers"

function MyForm() {
  const [data, setData] = useState<Record<string, unknown>>({})
  const [form] = Form.useForm()
  const onSubmit = useCallback(async () => {
    const formValidationResult = await form
      .validateFields()
      .then((values: Record<string, unknown>) => values)
      .catch((errorInfo: { errorFields: unknown[] }) => errorInfo)

    if ("errorFields" in formValidationResult) {
      return // nothing to do; validateFields will have already rendered error messages on form fields
    }
    // api call to save form data goes here, e.g.
    await yourApiCall(data)
  }, [form, data])

  return (
    <Form form={form}>
      <JsonForms
        data={data}
        onChange={(result) => setData(result.data as Record<string, unknown>)}
        schema={schema}
        uischema={uischema}
        renderers={rendererRegistryEntries}
        cells={cellRegistryEntries}
      />
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
```

## Contributing

### First time setup

- Install node.js (only Node v20 is currently supported)
- Install the version of [pnpm](https://pnpm.io/installation) specified in the `packageManager` field in `package.json`
- Clone this repository
- Install dependencies: `pnpm i --frozen-lockfile`
- Run tests: `pnpm test`
- Run tests and view coverage:
  - `pnpm test:cov`
  - `npx vite preview --outDir html`
  - in the terminal, type `o` + `enter` to open the results in a browser
- Run storybook: `pnpm storybook`

### Making changes

- Make changes to the code
- Run tests: `pnpm test`
- Run storybook: `pnpm storybook`
- Run format: `pnpm format:write`
- Run lint: `pnpm lint`
- Commit your changes

### Conventional commits

- We use [semantic release](https://github.com/semantic-release/semantic-release) to version & release our package, so make sure your commits adhere to the [conventional commit format](https://semantic-release.gitbook.io/semantic-release#commit-message-format)

### Testing package locally

- Run pack: `pnpm pack`
- If you previously installed the package, you may need to remove it first: `yarn remove @great-expectations/jsonforms-antd-renderers` and clear cache: `yarn cache clean`
- Install the package in your project: `yarn add /path/to/jsonforms-antd-renderers-0.0.0-semantic-release.tgz`
