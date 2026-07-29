# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a finance-tracker application built with React and Vite. It's a starter project from a Claude Code course that intentionally contains bugs, poor UI, and messy code to be fixed throughout the course.

## Development Commands
### Build Commands
```bash
npm install           # Install dependencies
npm run dev           # Start development server on http://localhost:5173
npm run build         # Build for production
npm run lint          # Check code with ESLint
```

### Project Scripts
- **dev**: Starts Vite development server with hot-reloading
- **build**: Builds the production-ready application
- **lint**: Runs ESLint code quality checks

### Testing
- No test script currently configured in package.json

## Code Structure
```
finance-tracker/
├── package.json
├── package-lock.json
├── src/
│   ├── App.jsx               # Root component, manages state & filtering
│   ├── Summary.jsx           # Computes & displays income/expenses/balance
│   ├── TransactionForm.jsx   # Add transaction form
│   ├── TransactionList.jsx   # Filterable transactions table
│   ├── assets/               # Application assets (icons, images)
│   ├── index.css             # Main CSS styles
│   └── main.jsx              # React entry point
├── public/
│   └── vite.svg              # Vite logo for development
└── vite.config.js            # Vite build configuration
```

## Configuration Files

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

## Project Configuration

### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint ."
  }
}
```

### Dependencies
- **React**: ^19.2.0
- **React DOM**: ^19.2.0
- **Vite**: ^7.2.4
- **ESLint**: ^9.39.1
- **TypeScript**: For type checking

## Common Development Tasks

### 1. Starting Development
```bash
npm install
npm run dev
```
This starts the Vite server on http://localhost:5173 for development.

### 2. Production Build
```bash
npm run build
```
Builds the application for production deployment.

### 3. Code Quality Checks
```bash
npm run lint
```
Validates code with ESLint following the defined rules.

### 4. Vite Plugins
- **react()**: React plugin for Vite
- Supports JSX, hot module replacement, and React features

## Development Notes
- This is a course project designed to teach debugging and refactoring techniques
- The application intentionally contains bugs and poor practices to be improved
- Built with modern React and Vite best practices (when fixed)
- Follows npm module conventions for dependencies and scripts

## Getting Started
The project includes:
- A basic expense tracker UI (needs improvement)
- Intentionally messy code (for debugging practice)
- Poor error handling (for error fixing practice)
- Inefficient implementations (for optimization practice)

Use the course materials to systematically fix these issues while maintaining the core functionality.