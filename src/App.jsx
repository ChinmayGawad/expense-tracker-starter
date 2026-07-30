import { useState, useMemo } from 'react'
import './App.css'
import Summary from './Summary'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import CategoryChart from './CategoryChart'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (filterType !== "all") {
      result = result.filter(t => t.type === filterType);
    }
    if (filterCategory !== "all") {
      result = result.filter(t => t.category === filterCategory);
    }
    return result;
  }, [transactions, filterType, filterCategory]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="app-layout">
      {/* Top Header Navbar */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Finance Vault</h1>
            <span className="brand-badge">Personal Dashboard</span>
          </div>
        </div>

      </header>

      {/* Main Container */}
      <main className="app-container">
        <Summary transactions={transactions} />

        <div className="dashboard-grid">
          <TransactionForm
            onSubmit={(txn) => setTransactions(prev => [...prev, txn])}
          />

          <TransactionList
            filteredTransactions={filteredTransactions}
            categories={categories}
            filterType={filterType} setFilterType={setFilterType}
            filterCategory={filterCategory} setFilterCategory={setFilterCategory}
            handleDelete={handleDelete}
          />
        </div>

        <CategoryChart transactions={transactions} />
      </main>
    </div>

  );
}

export default App