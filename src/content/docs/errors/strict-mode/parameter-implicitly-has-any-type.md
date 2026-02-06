---
title: "TS7006: Parameter 'X' implicitly has an 'any' type"
description: How to fix TypeScript error when function parameters lack type annotations
keywords: "TS7006"
---

## What's happening?

This error occurs when a function parameter **has no type annotation** and TypeScript cannot infer its type.

With `strict` or `noImplicitAny` enabled, all parameters must have explicit types.

---

## Reproduction
```ts
function greet(name) {
  // ❌ Parameter 'name' implicitly has an 'any' type
  return `Hello, ${name}!`;
}
```

---

## Why does TypeScript complain?

TypeScript cannot determine the type of `name`:
- No type annotation → defaults to `any`
- `any` defeats the purpose of TypeScript's type system
- Strict mode requires explicit types

---

## Solutions

### Option 1: Add a type annotation (recommended)
```ts
function greet(name: string) {
  // ✅
  return `Hello, ${name}!`;
}
```

**When to use:**
- ✅ Always - this is the correct fix
- ✅ Provides type safety and autocomplete

---

### Option 2: Use type inference from default values
```ts
function greet(name = "Guest") {
  // ✅ TypeScript infers name: string
  return `Hello, ${name}!`;
}
```

**When to use:**
- ✅ When you have a sensible default value
- ✅ Cleaner than explicit annotation + default

---

### Option 3: Destructure with types
```ts
function greet({ name }: { name: string }) {
  // ✅
  return `Hello, ${name}!`;
}

// Or with an interface
interface GreetParams {
  name: string;
}

function greet({ name }: GreetParams) {
  // ✅
  return `Hello, ${name}!`;
}
```

**When to use:**
- ✅ When accepting object parameters
- ✅ Better for functions with many parameters

---

### Option 4: Disable strict checking (not recommended)
```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

**When to use:**
- ⚠️ Only during migration from JavaScript
- ⚠️ Not recommended - loses type safety

---

## Common scenarios

### Event handlers
```ts
button.addEventListener('click', (event) => {
  // ❌ Parameter 'event' implicitly has an 'any' type
  console.log(event.target);
});

// ✅ Fix:
button.addEventListener('click', (event: MouseEvent) => {
  console.log(event.target);
});
```

### Array methods
```ts
const numbers = [1, 2, 3];
numbers.forEach((num) => {
  // ✅ TypeScript infers num: number from array type
  console.log(num * 2);
});

const data: any[] = [1, 2, 3];
data.forEach((item) => {
  // ❌ Parameter 'item' implicitly has an 'any' type
  console.log(item);
});

// ✅ Fix: Type the array
const data: number[] = [1, 2, 3];
```

### Callback functions
```ts
function fetchData(callback) {
  // ❌ Parameter 'callback' implicitly has an 'any' type
  callback({ data: "result" });
}

// ✅ Fix:
function fetchData(callback: (result: { data: string }) => void) {
  callback({ data: "result" });
}

// Or with a type alias
type FetchCallback = (result: { data: string }) => void;

function fetchData(callback: FetchCallback) {
  callback({ data: "result" });
}
```

### React event handlers
```ts
function handleClick(event) {
  // ❌ Parameter 'event' implicitly has an 'any' type
  console.log(event.currentTarget);
}

// ✅ Fix:
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget);
}
```

### Reduce callback
```ts
const sum = [1, 2, 3].reduce((acc, num) => acc + num, 0);
// ✅ TypeScript infers both acc and num as number

const result = data.reduce((acc, item) => {
  // ❌ If data is any[], both parameters are implicitly any
  return acc + item;
}, 0);

// ✅ Fix: Type the array
const data: number[] = [1, 2, 3];
```

---

## Key takeaways

- Always add type annotations to function parameters
- Use type inference when possible (defaults, array methods)
- `noImplicitAny` prevents bugs by requiring explicit types
- Enable strict mode for better type safety

---

## Additional resources

- [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)
- [Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Function Types](https://www.typescriptlang.org/docs/handbook/2/functions.html)
