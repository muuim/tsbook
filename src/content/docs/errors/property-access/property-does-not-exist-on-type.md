---
title: "TS2339: Property 'X' does not exist on type 'Y'"
description: How to fix TypeScript error when accessing non-existent properties
keywords: "TS2339"
---

## What's happening?

This error occurs when you try to access a property that **doesn't exist on the type** according to TypeScript.

---

## Reproduction
```ts
interface User {
  name: string;
  email: string;
}

const user: User = { name: "Alice", email: "alice@example.com" };
console.log(user.age);
// ❌ Property 'age' does not exist on type 'User'
```

---

## Solutions

### Option 1: Add the property to the interface
```ts
interface User {
  name: string;
  email: string;
  age?: number; // ✅ Made optional
}

const user: User = { name: "Alice", email: "alice@example.com" };
console.log(user.age); // ✅ Returns undefined
```

### Option 2: Use a type assertion (if you know the runtime shape)
```ts
interface ExtendedUser extends User {
  age: number;
}

const user = { name: "Alice", email: "alice@example.com", age: 30 };
console.log((user as ExtendedUser).age); // ✅
```

### Option 3: Use index signatures for dynamic properties
```ts
interface User {
  name: string;
  email: string;
  [key: string]: any; // ✅ Allows any additional properties
}
```

---

## Common scenarios

### API responses with extra fields
```ts
const response = await fetch('/api/user');
const data = await response.json();
console.log(data.username);
// ❌ Property 'username' does not exist on type 'any'

// ✅ Fix: Define the expected shape
interface ApiResponse {
  username: string;
  email: string;
}

const data: ApiResponse = await response.json();
console.log(data.username); // ✅
```

---

## Key takeaways

- Define all properties in your interfaces
- Use optional properties (`?`) for fields that might not exist
- Prefer type definitions over `any`

---

## Additional resources

- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
