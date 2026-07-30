import { useState } from 'react';

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onSubmit({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <div className="form-header">
        <div className="form-title-group">
          <div className="form-title-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <h2>New Transaction</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        {/* Type selector pill toggle */}
        <div className="type-toggle-group">
          <button
            type="button"
            className={`type-toggle-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => setType('expense')}
          >
            <span className="dot"></span>
            Expense
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => setType('income')}
          >
            <span className="dot"></span>
            Income
          </button>
        </div>

        <div className="form-inputs-grid">
          {/* Description input */}
          <div className="input-group">
            <label className="input-label">Description</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="e.g. Weekly Groceries"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Amount input */}
          <div className="input-group">
            <label className="input-label">Amount</label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category select */}
          <div className="input-group">
            <label className="input-label">Category</label>
            <div className="input-wrapper select-wrapper">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <span className="select-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Transaction</span>
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
