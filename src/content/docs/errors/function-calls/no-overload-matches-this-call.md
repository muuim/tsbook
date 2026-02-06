---
title: "TS2769: No overload matches this call"
description: How to fix TypeScript error when function arguments don't match any overload signature
keywords: "TS2769"
---

## What's happening?

This error occurs when you call a function with arguments that **don't match any of its overload signatures**.

Overloaded functions accept multiple argument patterns, and TypeScript checks that your call matches at least one.

---

## Reproduction
```ts
function format(value: string): string;
function format(value: number, decimals: number): string;
function format(value: string | number, decimals?: number): string {
  if (typeof value === "number") {
    return value.toFixed(decimals);
  }
  return value;
}

format("Hello"); // ✅ Matches first overload
format(3.14159, 2); // ✅ Matches second overload
format(3.14159); // ❌ No overload matches this call
```

---

## Why does TypeScript complain?

TypeScript checks the overload signatures (not the implementation):
- `format(string)` → ✅
- `format(number, number)` → ✅
- `format(number)` → ❌ No matching overload

The implementation signature is only for internal use.

---

## Solutions

### Option 1: Add a matching overload
```ts
function format(value: string): string;
function format(value: number): string; // ✅ Add this overload
function format(value: number, decimals: number): string;
function format(value: string | number, decimals?: number): string {
  if (typeof value === "number") {
    return value.toFixed(decimals ?? 2); // Default decimals
  }
  return value;
}

format(3.14159); // ✅ Now matches second overload
```

**When to use:**
- ✅ When the call pattern is valid and should be supported

---

### Option 2: Provide all required arguments
```ts
format(3.14159, 2); // ✅ Matches existing overload
```

**When to use:**
- ✅ When you can provide the missing arguments
- ✅ Simplest fix if arguments are available

---

### Option 3: Use a type assertion (if you're certain)
```ts
(format as (value: number) => string)(3.14159); // ⚠️
```

**When to use:**
- ⚠️ Only when you know the implementation supports it
- ⚠️ Not recommended - fix the overloads instead

---

## Common scenarios

### React.createElement overloads
```ts
React.createElement("div", { className: "container" }); // ✅
React.createElement("div", "Hello"); // ❌ No overload matches
// Second argument must be props object or null

// ✅ Fix:
React.createElement("div", null, "Hello");
```

### Array.from with mapping
```ts
Array.from([1, 2, 3], x => x * 2); // ✅
Array.from([1, 2, 3], x => x * 2, thisArg); // ❌ No overload matches
// Array.from doesn't accept a third argument in this way

// ✅ Fix: Use map instead
[1, 2, 3].map(x => x * 2);
```

### fetch API
```ts
fetch("/api/data", { method: "POST" }); // ✅
fetch("/api/data", { method: "POST", body: { data: "value" } }); 
// ❌ No overload matches
// body must be a string or FormData, not an object

// ✅ Fix:
fetch("/api/data", { 
  method: "POST", 
  body: JSON.stringify({ data: "value" }) 
});
```

---

## Key takeaways

- Overload signatures define the allowed call patterns
- The implementation signature is not checked by callers
- Add missing overloads for valid call patterns
- Check library documentation for correct argument types

---

## Additional resources

- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
