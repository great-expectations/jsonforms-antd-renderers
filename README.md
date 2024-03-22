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

### Making changes

- Make changes to the code
- Run tests: `pnpm test`
- Run storybook: `pnpm storybook`
- Run format: `pnpm format:write`
- Run lint: `pnpm lint`
- Commit your changes

### Testing package locally

- Run pack: `pnpm pack`
- If you previously installed the package, you may need to remove it first: `yarn remove @great-expectations/jsonforms-antd-renderers` and clear cache: `yarn cache clean`
- Install the package in your project: `yarn add /path/to/jsonforms-antd-renderers-0.0.0-semantic-release.tgz`
