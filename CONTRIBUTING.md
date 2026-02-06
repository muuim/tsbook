# Contributing to tsbook

Thank you for your interest in contributing to tsbook! 🎉

## How to Contribute

### 1. Add a New Error Page

The easiest way to contribute is to document a TypeScript error you've encountered.

**Steps:**

1. Fork this repository
2. Create a new file in the appropriate category:
```
   src/content/docs/errors/[category]/your-error.md
```
3. Use the template below
4. Submit a pull request

**Template:**
```md
---
title: "TSxxxx: Your Error Message"
description: Brief description of the error
keywords: "TSxxxx"
---

## What's happening?

Explain what causes this error.

## Reproduction

\`\`\`ts
// Code that triggers the error
\`\`\`

## Solutions

### Option 1: [Solution name]

\`\`\`ts
// Fixed code
\`\`\`

**When to use:**
- Explain when this solution is appropriate

### Option 2: [Alternative solution]

\`\`\`ts
// Alternative fix
\`\`\`

## Common scenarios

Show real-world examples where this error occurs.

## Key takeaways

- Bullet points summarizing the main lessons

## Additional resources

- [Link to TypeScript docs]
```

### 2. Improve Existing Documentation

Found a typo or unclear explanation? Feel free to submit a PR with improvements!

### 3. Translate Content

We welcome translations! 

1. Copy the English file to the appropriate locale directory:
```
   src/content/docs/[lang]/errors/[category]/your-error.md
```
2. Translate the content
3. Keep the same filename as the English version

## Categories

Place your error documentation in the appropriate category:

- `null-undefined/` - Null and undefined related errors
- `type-assignment/` - Type compatibility and assignment errors
- `property-access/` - Property and index access errors
- `function-calls/` - Function invocation errors
- `declarations/` - Variable and identifier declarations
- `generics/` - Generic type parameters
- `async/` - Async and Promise errors
- `classes/` - Class-related errors
- `modules/` - Module and import errors
- `strict-mode/` - Strict compiler option errors

## Writing Guidelines

### Do:
✅ Use clear, simple language  
✅ Include practical code examples  
✅ Show both the error and the fix  
✅ Provide multiple solution options  
✅ Explain when to use each solution

### Don't:
❌ Copy-paste from official docs without adding value  
❌ Use overly technical jargon  
❌ Skip code examples  
❌ Only show one solution when alternatives exist

## Code Style

- Use TypeScript 5.x syntax
- Keep examples concise and focused
- Use realistic variable names (not `foo`, `bar`)
- Add comments where helpful

## Pull Request Process

1. Ensure your markdown follows the template
2. Check that code examples are correct
3. Test locally if possible: `npm run dev`
4. Write a clear PR description

## Questions?

Open an issue and we'll help you out!

## License

By contributing, you agree that your contributions will be licensed under the same license as this project.
