---
title: "TS2304: Cannot find name 'X'"
description: How to fix TypeScript error when variables or types are not defined
keywords: "TS1308"
---

## What's happening?

This error occurs when TypeScript **cannot find a variable, function, or type** in the current scope.

---

## Reproduction
```ts
console.log(myVariable);
// ❌ Cannot find name 'myVariable'
```

---

## Solutions

### Option 1: Declare the variable
```ts
const myVariable = "Hello";
console.log(myVariable); // ✅
```

### Option 2: Import from another module
```ts
import { myVariable } from './config';
console.log(myVariable); // ✅
```

### Option 3: Add type declarations for global variables
```ts
// globals.d.ts
declare const myGlobal: string;

// Now usable everywhere
console.log(myGlobal); // ✅
```

---

## Common scenarios

### Missing imports
```ts
const result = axios.get('/api');
// ❌ Cannot find name 'axios'

// ✅ Fix:
import axios from 'axios';
```

### Using browser APIs without lib
```ts
// tsconfig.json missing "dom" in lib
const element = document.querySelector('div');
// ❌ Cannot find name 'document'

// ✅ Fix tsconfig.json:
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM"]
  }
}
```

---

## Key takeaways

- Always import before using
- Check `tsconfig.json` for missing `lib` entries
- Use `.d.ts` files for global declarations

---

## Additional resources

- [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
