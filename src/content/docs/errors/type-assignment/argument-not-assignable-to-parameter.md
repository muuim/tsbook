---
title: "TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'"
description: How to fix TypeScript errors when function arguments don't match parameter types
keywords: "TS2345"
---

## What's happening?

This error occurs when you pass an argument to a function that **doesn't match the expected parameter type**.

---

## Reproduction
```ts
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

const userName: string | undefined = getUserName();
greet(userName);
// ❌ Argument of type 'string | undefined' is not assignable to parameter of type 'string'
```

---

## Solutions

### Option 1: Narrow the type before calling
```ts
const userName = getUserName();
if (userName !== undefined) {
  greet(userName); // ✅
}
```

### Option 2: Provide a default value
```ts
greet(userName ?? "Guest"); // ✅
```

### Option 3: Update the function signature
```ts
function greet(name: string | undefined) {
  console.log(`Hello, ${name ?? "Guest"}!`);
}

greet(userName); // ✅
```

---

## Common scenarios

### Passing optional props
```ts
function setUserId(id: number) { /* ... */ }

interface Props {
  userId?: number;
}

function Component({ userId }: Props) {
  setUserId(userId);
  // ❌ Argument of type 'number | undefined' is not assignable
  
  // ✅ Fix:
  if (userId !== undefined) {
    setUserId(userId);
  }
}
```

---

## Key takeaways

- Always check the function signature
- Use type narrowing or defaults before calling
- Consider making function parameters more flexible

---

## Additional resources

- [Function Parameter Types](https://www.typescriptlang.org/docs/handbook/2/functions.html)
