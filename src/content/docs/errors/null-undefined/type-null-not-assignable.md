---
title: "TS2322: Type 'null' is not assignable to type 'string'"
description: How to fix TypeScript error when null values conflict with strict types
keywords: "TS2322"
---

## What's happening?

This error occurs when a value that **may be `null`** is assigned to a variable that expects a **strict type** (like `string`).

With `strictNullChecks` enabled, TypeScript treats `null` as a distinct type.

---

## Reproduction
```ts
function getStoredValue(): string | null {
  const stored = localStorage.getItem('username');
  return stored; // Can be null
}

const username: string = getStoredValue();
// ❌ Type 'null' is not assignable to type 'string'
```

---

## Solutions

### Option 1: Nullish coalescing operator
```ts
const username: string = getStoredValue() ?? "default"; // ✅
```

### Option 2: Type narrowing
```ts
const value = getStoredValue();
if (value !== null) {
  const username: string = value; // ✅
}
```

### Option 3: Update the type
```ts
const username: string | null = getStoredValue(); // ✅
```

---

## Common scenarios

### localStorage
```ts
const token: string = localStorage.getItem('token');
// ❌ Type 'string | null' is not assignable

// ✅ Fix:
const token: string = localStorage.getItem('token') ?? "";
```

### Database queries
```ts
const user: User = await db.findOne({ id: 1 });
// ❌ Type 'User | null' is not assignable

// ✅ Fix:
const user = await db.findOne({ id: 1 });
if (user === null) {
  throw new Error("User not found");
}
```

---

## Key takeaways

- `null` and `undefined` are different types in TypeScript
- Use `?? ""` for default values
- Use type guards (`!== null`) for safety
- Avoid `!` unless absolutely certain

---

## Additional resources

- [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
