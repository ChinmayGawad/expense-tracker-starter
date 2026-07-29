function TransactionList({
  filteredTransactions,
  categories,
  filterType, setFilterType,
  filterCategory, setFilterCategory,
  handleDelete
}) {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'food': return '🍔';
      case 'housing': return '🏠';
      case 'utilities': return '💡';
      case 'transport': return '🚗';
      case 'entertainment': return '🎬';
      case 'salary': return '💰';
      default: return '📦';
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div className="transactions-title-group">
          <h2>Recent Transactions</h2>
          <span className="count-badge">{filteredTransactions.length}</span>
        </div>

        {/* Filters bar */}
        <div className="filters">
          <div className="filter-select-wrapper">
            <span className="filter-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <p className="empty-title">No transactions found</p>
          <p className="empty-desc">Try adjusting your filters or add a new transaction above.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id} className="transaction-row">
                  <td className="date-cell">
                    <span className="date-pill">{t.date}</span>
                  </td>
                  <td className="desc-cell">
                    <span className="transaction-desc">{t.description}</span>
                  </td>
                  <td className="category-cell">
                    <span className={`category-badge cat-${t.category}`}>
                      <span className="cat-icon">{getCategoryIcon(t.category)}</span>
                      <span className="cat-name">{t.category}</span>
                    </span>
                  </td>
                  <td className="amount-cell text-right">
                    <span className={t.type === "income" ? "income-amount" : "expense-amount"}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="action-cell text-center">
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(t.id)}
                      title="Delete Transaction"
                      aria-label="Delete transaction"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;

