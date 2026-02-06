---
title: "TS1308: 'await' has no effect on the type of this expression"
description: How to fix TypeScript error when await is used on non-Promise values
keywords: "TS1308"
---

## What's happening?

This error occurs when you use `await` on a value that **is not a Promise**.

TypeScript detects that the `await` keyword has no effect because the value is already synchronous.

---

## Reproduction
```ts
function getName(): string {
  return "Alice";
}

async function greet() {
  const name = await getName();
  // ❌ 'await' has no effect on the type of this expression
  console.log(name);
}
```

`getName()` returns a plain `string`, not a `Promise<string>`, so `await` is unnecessary.

---

## Why does TypeScript complain?

TypeScript analyzes the return type:
- `Promise<T>` → `await` is needed ✅
- `T` (non-Promise) → `await` has no effect ❌

Using `await` on non-Promise values suggests a misunderstanding of async code.

---

## Solutions

### Option 1: Remove await (recommended)
```ts
async function greet() {
  const name = getName(); // ✅ No await needed
  console.log(name);
}
```

**When to use:**
- ✅ The function returns a synchronous value
- ✅ Simplest and clearest solution

---

### Option 2: Make the function async
```ts
async function getName(): Promise<string> {
  return "Alice"; // Automatically wrapped in Promise
}

async function greet() {
  const name = await getName(); // ✅ Now await is needed
  console.log(name);
}
```

**When to use:**
- ✅ The function will eventually need to be async (e.g., fetching data)
- ✅ You want a consistent async API

---

### Option 3: Return a Promise explicitly
```ts
function getName(): Promise<string> {
  return Promise.resolve("Alice");
}

async function greet() {
  const name = await getName(); // ✅
  console.log(name);
}
```

**When to use:**
- ✅ Wrapping synchronous code to match an async interface

---

## Common scenarios

### Awaiting synchronous array methods
```ts
const users = ["Alice", "Bob"];
const first = await users[0];
// ❌ 'await' has no effect

// ✅ Fix: Remove await
const first = users[0];
```

### Awaiting a value instead of a Promise-returning function
```ts
const result = await fetchData;
// ❌ If fetchData is a Promise, not a function

// ✅ Fix: Call the function
const result = await fetchData();
```

### Mixed sync/async code
```ts
async function processData(data: string) {
  const parsed = await JSON.parse(data);
  // ❌ JSON.parse is synchronous
  
  // ✅ Fix:
  const parsed = JSON.parse(data);
  const validated = await validateData(parsed); // This actually needs await
}
```

---

## Key takeaways

- Only use `await` with Promises
- TypeScript's error helps you avoid unnecessary `await`
- If you need async behavior, make the function return a Promise
- Remove `await` from synchronous operations

---

## Additional resources

- [Async Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#async-functions)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
