---
title: "TS2307: Cannot find module 'X' or its corresponding type declarations"
description: How to fix TypeScript error when imports cannot be resolved
keywords: "TS2307"
---

## What's happening?

This error occurs when TypeScript **cannot find the module** you're trying to import.

This can happen due to missing dependencies, incorrect paths, or missing type declarations.

---

## Reproduction
```ts
import axios from 'axios';
// ❌ Cannot find module 'axios' or its corresponding type declarations
```

---

## Why does TypeScript complain?

TypeScript checks:
1. Is the package installed in `node_modules`? → ❌
2. Does the file exist at the import path? → ❌
3. Are type declarations available? → ❌

If all checks fail, the import cannot be resolved.

---

## Solutions

### Option 1: Install the missing package
```bash
npm install axios
# or
yarn add axios
# or
pnpm add axios
```

**When to use:**
- ✅ The package is not installed
- ✅ Most common fix

---

### Option 2: Install type declarations
```bash
# For packages without built-in types
npm install --save-dev @types/node
npm install --save-dev @types/react
```

**When to use:**
- ✅ Package is installed but has no TypeScript types
- ✅ Types are in DefinitelyTyped (@types/* packages)

---

### Option 3: Fix the import path
```ts
// ❌ Wrong
import { helper } from './utils';

// ✅ Correct
import { helper } from './utils.ts';
// or
import { helper } from './utils/index.ts';
```

**When to use:**
- ✅ The file exists but path is incorrect
- ✅ Missing file extension in Deno/some bundlers

---

### Option 4: Configure module resolution in tsconfig.json
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**When to use:**
- ✅ Using path aliases
- ✅ Custom module resolution strategy

---

### Option 5: Create a type declaration file (for untyped packages)
```ts
// src/types/untyped-package.d.ts
declare module 'untyped-package' {
  export function doSomething(): void;
}
```

**When to use:**
- ✅ Package has no types and no @types/* package available
- ⚠️ You'll need to maintain these types yourself

---

## Common scenarios

### Missing Node.js types
```ts
import * as fs from 'fs';
// ❌ Cannot find module 'fs'

// ✅ Fix: Install Node types
npm install --save-dev @types/node
```

### Wrong file extension
```ts
import { api } from './api.js';
// ❌ File exists as api.ts, not api.js

// ✅ Fix: Use correct extension or omit it
import { api } from './api';
```

### Importing JSON files
```ts
import data from './data.json';
// ❌ Cannot find module './data.json'

// ✅ Fix: Enable resolveJsonModule in tsconfig.json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### Path alias not configured
```ts
import { Button } from '@components/Button';
// ❌ Cannot find module '@components/Button'

// ✅ Fix: Configure paths in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    }
  }
}
```

### CSS/Image imports without declarations
```ts
import styles from './App.module.css';
// ❌ Cannot find module './App.module.css'

// ✅ Fix: Create declaration file
// src/types/modules.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const value: string;
  export default value;
}
```

---

## Key takeaways

- Always install packages before importing them
- Install `@types/*` packages for type declarations
- Check import paths are correct
- Configure `tsconfig.json` for custom module resolution
- Create `.d.ts` files for untyped modules

---

## Additional resources

- [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [tsconfig paths](https://www.typescriptlang.org/tsconfig#paths)
