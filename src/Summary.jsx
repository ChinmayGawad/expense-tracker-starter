function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Calculate expense ratio for the visual bar
  const totalFlow = totalIncome + totalExpenses;
  const incomePercent = totalFlow > 0 ? Math.round((totalIncome / totalFlow) * 100) : 50;
  const expensePercent = totalFlow > 0 ? Math.round((totalExpenses / totalFlow) * 100) : 50;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="summary-container">
      <div className="summary">
        {/* Total Balance Card */}
        <div className="summary-card balance-card">
          <div className="card-header">
            <div className="card-icon-wrapper balance-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <span className="card-label">Total Balance</span>
          </div>
          <div className="card-body">
            <p className={`balance-amount ${balance < 0 ? 'negative' : ''}`}>
              {formatCurrency(balance)}
            </p>
            <span className="card-subtitle">Net Available Funds</span>
          </div>
        </div>

        {/* Income Card */}
        <div className="summary-card income-card">
          <div className="card-header">
            <div className="card-icon-wrapper income-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="card-label">Income</span>
          </div>
          <div className="card-body">
            <p className="income-amount">+{formatCurrency(totalIncome)}</p>
            <span className="card-tag income-tag">Inflow</span>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="summary-card expense-card">
          <div className="card-header">
            <div className="card-icon-wrapper expense-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            </div>
            <span className="card-label">Expenses</span>
          </div>
          <div className="card-body">
            <p className="expense-amount">-{formatCurrency(totalExpenses)}</p>
            <span className="card-tag expense-tag">Outflow</span>
          </div>
        </div>
      </div>

      {/* Cash Flow Visual Bar */}
      <div className="cash-flow-bar-card">
        <div className="cash-flow-labels">
          <span>Income ({incomePercent}%)</span>
          <span>Expenses ({expensePercent}%)</span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill income-fill" 
            style={{ width: `${incomePercent}%` }} 
            title={`Income: ${incomePercent}%`}
          />
          <div 
            className="progress-fill expense-fill" 
            style={{ width: `${expensePercent}%` }} 
            title={`Expenses: ${expensePercent}%`}
          />
        </div>
      </div>
    </div>
  );
}

export default Summary;