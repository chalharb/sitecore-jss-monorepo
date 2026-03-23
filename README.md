<p align="center">
  <img src="docs/hero.jpg" alt="Turborepo + Sitecore Monorepo" width="100%" />
</p>

# Sitecore Monorepo Using Turborepo

Turborepo-based monorepo for Sitecore Next.js applications with shared UI components, configuration, and tooling.

## Structure

### Apps

- **`@acme/corp`** (`apps/corp`) - Corporate Sitecore JSS Next.js application (port 3000)
- **`@acme/marketing`** (`apps/marketing`) - Marketing Sitecore JSS Next.js application (port 3001)

### Packages

- **`@repo/ui`** (`packages/ui`) - Shared React component library built on shadcn/ui. Exports components (Button, Card, Input, Label, Badge, Dialog, Separator), the `cn()` utility, and a shared Tailwind CSS theme.
- **`@repo/sitecore-components`** (`packages/sitecore`) - Shared Sitecore JSS components (Container, ContentBlock, ColumnSplitter) and a component builder config for automatic registration.
- **`@repo/eslint-config`** (`packages/eslint-config`) - Shared ESLint 9 flat configs: `base`, `next-js`, `react-internal`, and `sitecore-nextjs`.
- **`@repo/typescript-config`** (`packages/typescript-config`) - Shared TypeScript configs: `base`, `nextjs`, `react-library`, and `sitecore-nextjs`.

## Prerequisites

- Node.js >= 18
- npm 11+

## Getting Started

```sh
npm install
```

## Scripts

All commands are run from the repo root via Turborepo:

```sh
# Build all apps and packages
npm run build

# Build a specific app
npx turbo build --filter=@acme/corp

# Start development servers (all apps)
npm run dev

# Start Sitecore connected mode (all apps)
npm run start:connected

# Start Sitecore connected mode (single app)
npx turbo start:connected --filter=@acme/corp

# Start production server (requires build first)
npm run start:production

# Lint all apps and packages
npm run lint

# Type check all apps and packages
npm run check-types

# Format code with Prettier
npm run format
```

## Turbo Caching

Turborepo caches the output of cacheable tasks. Key cached tasks:

- **`bootstrap`** - Generates Sitecore config, component builder, plugins, and metadata into `src/temp/` and `scripts/temp/`. Cached based on `scripts/`, `src/components/`, and `.env*` inputs.
- **`build`** - Runs `next build`. Depends on `bootstrap` completing first. Caches `.next/` output.

Non-cached persistent tasks (`dev`, `start:connected`, `start:production`) still benefit from cached `bootstrap` output -- turbo skips regeneration when inputs haven't changed.

## Using Shared Packages

### UI Components

```tsx
import { Button } from '@repo/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui/card';
import { cn } from '@repo/ui/lib/utils';
```

Import the shared Tailwind theme in your app's entrypoint:

```tsx
import '@repo/ui/styles/theme.css';
```

### Sitecore Components

Components are automatically registered via the component builder config:

```ts
import { components as sitecoreComponents } from '@repo/sitecore-components/component-builder-config';
```

Or import individual components directly:

```tsx
import { Default as Container } from '@repo/sitecore-components/container';
import ContentBlock from '@repo/sitecore-components/content-block';
```

### Adding shadcn Components

From the `packages/ui` directory:

```sh
npx shadcn@latest add <component-name>
```

The `components.json` is pre-configured to output into `src/`.

### ESLint Config

In your app's `eslint.config.mjs`:

```js
import { sitecoreNextJsConfig } from '@repo/eslint-config/sitecore-nextjs';

export default sitecoreNextJsConfig;
```

### TypeScript Config

In your app's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/sitecore-nextjs.json"
}
```

## Environment Variables

The following environment variables are declared in `turbo.json` as global dependencies (cache invalidates when they change):

| Variable | Description |
|---|---|
| `NODE_ENV` | Node environment |
| `FETCH_WITH` | Data fetching strategy (REST/GraphQL) |
| `GRAPH_QL_SERVICE_RETRIES` | GraphQL retry count |
| `DISABLE_SSG_FETCH` | Disable static generation fetching |
| `EXPORT_MODE` | Enable static export mode |
| `JSS_MODE` | JSS operating mode (connected/disconnected) |

App-specific environment variables are configured via `.env` files in each app directory.
