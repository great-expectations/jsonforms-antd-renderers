# Ant Design Renderers for `jsonforms`

[jsonforms](jsonforms.io) is "a declarative framework for efficiently building form-based web UIs." `jsonforms` has multiple renderer packages for different frameworks and component libraries, and this is one such package.

## Getting started

```bash
$ npm install jsonforms-antd-renderers
```

### Using AntD Renderers

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "jsonforms-antd-renderers"

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

### Using our UISchemas

This library expands upon the types and configurability of UISchemas in jsonforms. When writing UISchemas, you'll want to
import our UISchema types to take advantage of our configuration options.

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
  TextControlOptions,
} from "jsonforms-antd-renderers"

const schema = {
  type: "object",
  properties: { password: { type: "string" } },
}

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/password",
      // properties like type: "password" here are unique to this renderer package. This allows you more declarative control over how your forms
      // render. In this case, the password field will be rendered with AntD's password input component
      options: { type: "password" } satisfies TextControlOptions,
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

## Contributing

### First time setup

- Install node.js (only Node v20 is currently supported)
- Install pnpm: https://pnpm.io/installation (use pnpm 8.6.8+)
- Clone this repository
- Install dependencies: pnpm i --frozen-lockfile
- Run tests: `pnpm test`
- Run storybook: `pnpm storybook`
