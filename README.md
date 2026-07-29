# 💎 Finance Vault - Personal Expense Tracker

A modern, high-performance personal financial dashboard built with **React**, **Vite**, and custom **CSS3 Design System**. Track your income, manage daily expenses, visualize cash flow ratios, and analyze your spending habits with a sleek glassmorphism UI.

---

## ✨ Features

- 📊 **Financial Summary & Cash Flow Bar**: Real-time breakdown of Total Balance, Total Income, and Total Expenses with an interactive visual ratio bar and dynamic balance indicator badges.
- ➕ **Transaction Management**: Quickly log new transactions with custom descriptions, numerical amounts, transaction types (Income / Expense), and categories.
- 🏷️ **Categorization**: Multi-category tagging system supporting `Food`, `Housing`, `Utilities`, `Transport`, `Entertainment`, `Salary`, and `Other`.
- 🔍 **Dynamic Filtering**: Instantly filter your transactions by Type (*All, Income, Expense*) and Category.
- 🗑️ **Delete & Confirmation**: Easily manage your transaction history with quick deletion prompts.
- 🎨 **Modern Dark Glassmorphism UI**: Crafted with custom CSS tokens, smooth hover micro-animations, responsive grid layout, and vibrant status badges.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React](https://react.dev/)
- **Build Tool / Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS3 (Custom Design System, Flexbox, CSS Grid, Glassmorphism)
- **Icons**: Custom Inline SVGs
- **Font Stack**: Modern System UI & Google Fonts

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and `npm` installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChinmayGawad/expense-tracker-starter.git
   cd expense-tracker-starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to view the application in action.

---

## 📁 Project Structure

```
expense-tracker-starter/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css               # Dashboard layout & responsive grid styles
│   ├── App.jsx               # Main container & state management
│   ├── Summary.jsx           # Financial metrics & cash flow bar
│   ├── TransactionForm.jsx   # Add transaction form component
│   ├── TransactionList.jsx   # List & filtering component
│   ├── index.css             # Global design tokens & reset styles
│   └── main.jsx              # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Bundles the app for production deployment.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Runs ESLint to check for code quality issues.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
