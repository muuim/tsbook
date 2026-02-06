---
title: "TS2322: Type 'string | undefined' is not assignable to type 'string'"
description: How to fix TypeScript error when assigning possibly undefined values to strict string types
keywords: "TS2322"
---

## What's happening?

This error occurs when a value that **may be `undefined`** is assigned to a variable that expects a **strict `string`**.

With `strictNullChecks` enabled, TypeScript treats `undefined` as a separate type and prevents unsafe assignments.

---

## Reproduction
```ts
function getName(): string | undefined {
  return Math.random() > 0.5 ? "Alice" : undefined;
}

const name: string = getName();
// ❌ Type 'string | undefined' is not assignable to type 'string'
```

`getName()` can return `undefined`, but `name` is declared as `string` only.

---

## Why does TypeScript complain?

TypeScript considers these possibilities:
- `"Alice"` → ✅ OK
- `undefined` → ❌ Not assignable to `string`

Because the second case is possible, the assignment is rejected at compile time.

---

## Solutions

### Option 1: Narrow the type with a runtime check (recommended)
```ts
const value = getName();
if (value !== undefined) {
  const name: string = value; // ✅ TypeScript knows it's a string here
  useString(name);
}
```

**When to use:**
- ✅ Safest option
- ✅ Keeps the type system honest
- ✅ Best for critical code paths

---

### Option 2: Update the variable type to accept undefined
```ts
const name: string | undefined = getName(); // ✅
```

**When to use:**
- ✅ When `undefined` is a valid state in your domain logic
- ✅ Often the best design-level fix
- ✅ Forces consumers to handle the undefined case

---

### Option 3: Provide a default value
```ts
const name: string = getName() ?? "Guest"; // ✅
```

**When to use:**
- ✅ When you have a sensible fallback value
- ✅ Simple and safe
- ✅ Common in UI code (e.g., display names)

---

### Option 4: Non-null assertion operator (use sparingly)
```ts
const name: string = getName()!; // ⚠️
```

**When to use:**
- ⚠️ Only when you **know for certain** the value cannot be undefined
- ⚠️ Bypasses the type checker
- ⚠️ Can cause runtime errors if your assumption is wrong

**Example of valid usage:**
```ts
// Valid: immediately after setting the value
let cachedName: string | undefined;
cachedName = "Alice";
const name: string = cachedName!; // Safe because we just set it
```

---

## Common scenarios

### Optional chaining results
```ts
const name: string = user?.name;
// ❌ Type 'string | undefined' is not assignable to type 'string'

// ✅ Fix:
const name: string = user?.name ?? "Unknown";
```

### Array methods that may return undefined
```ts
const item: string = array.find(x => x.id === 1);
// ❌ Type 'string | undefined' is not assignable to type 'string'

// ✅ Fix:
const item = array.find(x => x.id === 1);
if (item !== undefined) {
  useString(item);
}
```

### Optional function parameters
```ts
function greet(name?: string) {
  const greeting: string = name;
  // ❌ Type 'string | undefined' is not assignable to type 'string'
  
  // ✅ Fix:
  const greeting: string = name ?? "Guest";
}
```

### React props
```ts
interface Props {
  userId?: string;
}

function UserCard({ userId }: Props) {
  const id: string = userId;
  // ❌ Type 'string | undefined' is not assignable to type 'string'
  
  // ✅ Fix:
  const id: string = userId ?? "anonymous";
}
```

---

## Key takeaways

- This error is TypeScript protecting you from potential `undefined` values
- **Prefer type narrowing** (Option 1) or **safe defaults** (Option 3) for production code
- **Avoid non-null assertions** (`!`) unless you're absolutely certain
- When `undefined` is part of your domain logic, **update the type** (Option 2)

---

## Additional resources

- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [strictNullChecks compiler option](https://www.typescriptlang.org/tsconfig#strictNullChecks)
