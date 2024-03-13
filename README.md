# Ant Design Renderers for `jsonforms`

[jsonforms](jsonforms.io) is "a declarative framework for efficiently building form-based web UIs." `jsonforms` has multiple renderer packages for different frameworks and component libraries, and this is one such package.

## Getting started

```bash
$ npm install jsonforms-antd-renderers
```

```tsx
import { JsonForms } from "@jsonforms/react"
import {
  rendererRegistryEntries,
  cellRegistryEntries,
} from "jsonforms-antd-renderers"
;<JsonForms
  schema={schema}
  renderers={rendererRegistryEntries}
  cells={cellRegistryEntries}
/>
```

## Contributing

### First time setup

- Install node.js (only Node v20 is currently supported)
- Install pnpm: https://pnpm.io/installation (use pnpm 8.6.8+)
- Clone this repository
- Install dependencies: pnpm i --frozen-lockfile
- Run tests: `pnpm test`
- Run storybook: `pnpm storybook`
