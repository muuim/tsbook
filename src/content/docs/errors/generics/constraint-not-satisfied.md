---
title: "TS2344: Type 'X' does not satisfy the constraint 'Y'"
description: How to fix TypeScript error when generic type arguments don't meet constraints
keywords: "TS2344"
---

## What's happening?

This error occurs when you provide a type argument to a generic that **doesn't satisfy the generic's constraint**.

Generic constraints ensure that type arguments have certain properties or extend certain types.

---

## Reproduction
```ts
function getProperty<T extends { id: number }>(obj: T, key: keyof T) {
  return obj[key];
}

interface User {
  name: string;
  email: string;
}

const user: User = { name: "Alice", email: "alice@example.com" };
getProperty(user, "name");
// ❌ Type 'User' does not satisfy the constraint '{ id: number }'
```

`User` doesn't have an `id` property, so it fails the constraint.

---

## Why does TypeScript complain?

TypeScript checks that `T` meets the constraint:
- Constraint requires: `{ id: number }`
- Provided type: `User` (no `id` property) → ❌

The constraint exists to ensure type safety in the function body.

---

## Solutions

### Option 1: Update the type to satisfy the constraint
```ts
interface User {
  id: number; // ✅ Add the required property
  name: string;
  email: string;
}

const user: User = { 
  id: 1, 
  name: "Alice", 
  email: "alice@example.com" 
};
getProperty(user, "name"); // ✅
```

**When to use:**
- ✅ When the constraint makes sense for your data model
- ✅ Most common and safest fix

---

### Option 2: Relax the constraint
```ts
function getProperty<T extends object>(obj: T, key: keyof T) {
  // ✅ Less strict constraint
  return obj[key];
}

getProperty(user, "name"); // ✅ Now works
```

**When to use:**
- ✅ When the original constraint was too strict
- ✅ When you don't actually need the specific properties

---

### Option 3: Use a union constraint
```ts
function getProperty<T extends { id: number } | { name: string }>(
  obj: T, 
  key: keyof T
) {
  return obj[key];
}

getProperty(user, "name"); // ✅ User has 'name'
```

**When to use:**
- ✅ When multiple type shapes are valid
- ✅ More flexible than a single constraint

---

### Option 4: Remove the constraint entirely
```ts
function getProperty<T>(obj: T, key: keyof T) {
  return obj[key];
}

getProperty(user, "name"); // ✅
```

**When to use:**
- ✅ When you don't need any constraint
- ⚠️ Loses type safety benefits

---

## Common scenarios

### React component props
```ts
function withId<T extends { id: string }>(Component: React.ComponentType<T>) {
  return (props: T) => <Component {...props} />;
}

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const ButtonWithId = withId<ButtonProps>(Button);
// ❌ Type 'ButtonProps' does not satisfy constraint '{ id: string }'

// ✅ Fix: Add id to ButtonProps
interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
}
```

### Array methods with constraints
```ts
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const tags = ["typescript", "javascript"];
findById(tags, 1);
// ❌ Type 'string' does not satisfy constraint '{ id: number }'

// ✅ Fix: Use appropriate data
const items = [{ id: 1, name: "TypeScript" }, { id: 2, name: "JavaScript" }];
findById(items, 1);
```

### Utility type constraints
```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type User = {
  id: number;
  name: string;
  age: number;
};

type StringKeys = KeysOfType<User, string>; // "name"
type BooleanKeys = KeysOfType<User, boolean>;
// ❌ Type 'number | string' does not satisfy constraint 'boolean'
```

---

## Key takeaways

- Generic constraints ensure type arguments meet requirements
- Add required properties to satisfy constraints
- Relax constraints when they're too strict
- Constraints improve type safety by limiting what types can be used

---

## Additional resources

- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [keyof and Lookup Types](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
