[![codecov](https://codecov.io/gh/great-expectations/jsonforms-antd-renderers/graph/badge.svg?token=aDz1isILuA)](https://codecov.io/gh/great-expectations/jsonforms-antd-renderers)

# Ant Design Renderers for `jsonforms`

[jsonforms](https://jsonforms.io/docs/) is "a declarative framework for efficiently building form-based web UIs." `jsonforms` has multiple renderer packages for different frameworks and component libraries, and this is one such package.
You can preview the renderers via storybook [here](https://great-expectations.github.io/jsonforms-antd-renderers/).

## Getting started

```bash
npm install @great-expectations/jsonforms-antd-renderers
```

### Using AntD Renderers

In order to use this package you need to import the renderer registry entries from this package and provide them to the `@jsonforms/react` `JsonForms` component:

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "@great-expectations/jsonforms-antd-renderers"

function MyForm({ data }: { data: Record<string, unknown> }) {
  return (
    <JsonForms
      data={data}
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
import { useState } from "react"
import { Form, Button } from "antd"
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  UISchema,
} from "@great-expectations/jsonforms-antd-renderers"

const schema = {
  type: "object",
  properties: { password: { type: "string" } },
} as const
// Be sure to use an `as const` assertion so that UISchema
// can see the specific types of `type` fields within a schema.
// i.e. without `as const`, the value "object" is interpreted
// as a string type, and not the string literal type "object"

const uischema: UISchema<typeof schema> = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/password",
      // Properties like type: "password" here are unique to this renderer package.
      // This allows you more declarative control over how your forms render.
      // In this case, the password field will be rendered with AntD's password input component.
      options: { type: "password" },
    },
  ],
}

function MyForm() {
  const [data, setData] = useState<Record<string, unknown>>({})

  return (
    <Form onFinish={() => myApiCall(data)}>
      <JsonForms
        data={data}
        onChange={(result) => setData(result.data as Record<string, unknown>)}
        schema={schema}
        uischema={uischema}
        renderers={rendererRegistryEntries}
      />
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
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

### Testing the package locally

- Create an installable tarball file from this directory: `pnpm pack`
- If you previously installed the package, you may need to remove it first: `npm uninstall @great-expectations/jsonforms-antd-renderers` and possibly clear your package manager's cache
- Install the package in your project: `npm install /path/to/jsonforms-antd-renderers-0.0.0-semantic-release.tgz`
