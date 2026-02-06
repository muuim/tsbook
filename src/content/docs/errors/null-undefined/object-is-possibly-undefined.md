---
title: "TS2532: Object is possibly 'undefined'"
description: How to fix TypeScript error when accessing properties on potentially undefined objects
keywords: "TS2532"
---

## What's happening?

This error occurs when you try to access a property or call a method on an object that **might be `undefined`**.

With `strictNullChecks` enabled, TypeScript prevents property access on potentially undefined values.

---

## Reproduction
```ts
interface User {
  name: string;
  email: string;
}

function getUser(): User | undefined {
  return Math.random() > 0.5 ? { name: "Alice", email: "alice@example.com" } : undefined;
}

const user = getUser();
console.log(user.name);
// ❌ Object is possibly 'undefined'
```

`getUser()` can return `undefined`, but we're accessing `.name` without checking.

---

## Why does TypeScript complain?

TypeScript considers these possibilities:
- `{ name: "Alice", ... }` → `.name` works ✅
- `undefined` → `.name` crashes ❌

Because the second case is possible, TypeScript rejects the unsafe property access.

---

## Solutions

### Option 1: Optional chaining (recommended)
```ts
const user = getUser();
console.log(user?.name); // ✅ Returns 'Alice' or undefined
```

**When to use:**
- ✅ Safest and most concise
- ✅ Returns `undefined` instead of throwing
- ✅ Can chain multiple levels: `user?.profile?.avatar?.url`

---

### Option 2: Type narrowing with a check
```ts
const user = getUser();
if (user !== undefined) {
  console.log(user.name); // ✅ TypeScript knows user is defined
}
```

**When to use:**
- ✅ When you need to perform multiple operations on the object
- ✅ Better for complex logic inside the block

---

### Option 3: Provide a default value
```ts
const user = getUser();
console.log(user?.name ?? "Guest"); // ✅ Falls back to "Guest"
```

**When to use:**
- ✅ When you have a sensible default
- ✅ Common in UI rendering

---

### Option 4: Non-null assertion (use sparingly)
```ts
const user = getUser();
console.log(user!.name); // ⚠️
```

**When to use:**
- ⚠️ Only when you're absolutely certain the value exists
- ⚠️ Can cause runtime errors if you're wrong

---

## Common scenarios

### API responses
```ts
const response = await fetch('/api/user');
const data = await response.json();
console.log(data.user.name);
// ❌ Object is possibly 'undefined'

// ✅ Fix:
console.log(data?.user?.name ?? "Unknown");
```

### Array find method
```ts
const users = [{ id: 1, name: "Alice" }];
const user = users.find(u => u.id === 2);
console.log(user.name);
// ❌ Object is possibly 'undefined'

// ✅ Fix:
const user = users.find(u => u.id === 2);
if (user) {
  console.log(user.name);
}
```

### Optional props in React
```ts
interface Props {
  user?: User;
}

function UserProfile({ user }: Props) {
  return <div>{user.name}</div>;
  // ❌ Object is possibly 'undefined'
  
  // ✅ Fix:
  return <div>{user?.name ?? "Guest"}</div>;
}
```

---

## Key takeaways

- **Use optional chaining** (`?.`) as your first choice
- Combine with **nullish coalescing** (`??`) for defaults
- Type narrowing is best for complex multi-step logic
- Avoid non-null assertions unless absolutely necessary

---

## Additional resources

- [Optional Chaining (?.)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining)
- [Nullish Coalescing (??)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing)
