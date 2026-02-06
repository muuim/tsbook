---
title: "TS2564: Property 'X' has no initializer and is not definitely assigned in the constructor"
description: How to fix TypeScript error for uninitialized class properties
keywords: "TS2564"
---

## What's happening?

This error occurs when a class property **is not initialized** and TypeScript cannot guarantee it will be assigned before use.

With `strictPropertyInitialization` enabled, all properties must be initialized in the constructor or at declaration.

---

## Reproduction
```ts
class User {
  name: string;
  email: string;
  // ❌ Property 'name' has no initializer and is not definitely assigned in the constructor
  // ❌ Property 'email' has no initializer and is not definitely assigned in the constructor
}

const user = new User();
console.log(user.name.toUpperCase()); // Runtime error: cannot read property of undefined
```

---

## Why does TypeScript complain?

TypeScript considers these possibilities:
- Properties are `undefined` until assigned
- Accessing `undefined.toUpperCase()` will crash at runtime

Without initialization, TypeScript cannot guarantee type safety.

---

## Solutions

### Option 1: Initialize in constructor (recommended)
```ts
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

const user = new User("Alice", "alice@example.com"); // ✅
```

**When to use:**
- ✅ Safest and most common approach
- ✅ Values are provided at construction time

---

### Option 2: Initialize at declaration
```ts
class User {
  name: string = "Guest";
  email: string = "guest@example.com";
}

const user = new User(); // ✅
```

**When to use:**
- ✅ When you have sensible default values
- ✅ Simple and clear

---

### Option 3: Make properties optional
```ts
class User {
  name?: string;
  email?: string;
}

const user = new User();
console.log(user.name?.toUpperCase()); // ✅ Safe with optional chaining
```

**When to use:**
- ✅ When properties might legitimately be undefined
- ✅ Forces consumers to handle undefined case

---

### Option 4: Definite assignment assertion (use sparingly)
```ts
class User {
  name!: string; // ! tells TypeScript "trust me, this will be assigned"
  email!: string;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.name = "Alice";
    this.email = "alice@example.com";
  }
}
```

**When to use:**
- ⚠️ Only when you're certain the property will be assigned before use
- ⚠️ Common with dependency injection or lifecycle methods
- ⚠️ Can cause runtime errors if you're wrong

---

## Common scenarios

### React class components
```ts
class UserProfile extends React.Component {
  private api: ApiClient;
  // ❌ Property 'api' has no initializer

  // ✅ Fix: Initialize in constructor
  constructor(props) {
    super(props);
    this.api = new ApiClient();
  }
}
```

### Dependency injection
```ts
class UserService {
  private database!: Database; // Using ! because it's injected

  setDatabase(db: Database) {
    this.database = db;
  }
}
```

### Async initialization
```ts
class DataLoader {
  data!: string[];

  async load() {
    this.data = await fetchData();
  }
}

// Usage:
const loader = new DataLoader();
await loader.load(); // Must call before accessing data
```

---

## Key takeaways

- Always initialize properties in the constructor or at declaration
- Use optional properties (`?`) when undefined is valid
- Avoid definite assignment assertion (`!`) unless necessary
- This error prevents common "undefined is not an object" runtime errors

---

## Additional resources

- [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)
- [Class Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#fields)
