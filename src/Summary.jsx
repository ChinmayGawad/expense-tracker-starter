import { useMemo } from 'react';

function Summary({ transactions }) {
  const totalIncome = useMemo(
    () => transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatLargeCurrency = (val) => {
    const abs = Math.abs(val);
    const dollars = Math.floor(abs);
    const cents = Math.round((abs - dollars) * 100);
    const sign = val < 0 ? '−' : '';
    return (
      <>
        <span className="balance-sign">{sign}</span>
        <span className="balance-dollars">{dollars.toLocaleString()}</span>
        <span className="balance-cents">.{cents.toString().padStart(2, '0')}</span>
      </>
    );
  };

  return (
    <div className="summary">
      <div className={`summary-card balance-card ${balance < 0 ? 'negative' : ''}`}>
        <span className="card-label">Total Balance</span>
        <p className="balance-amount">
          {balance < 0 ? formatLargeCurrency(balance) : (
            <>
              <span className="balance-sign">+</span>
              {formatLargeCurrency(balance)}
            </>
          )}
        </p>
        <div className="balance-footer">
          <span className="card-subtitle">Net Available Funds</span>
          <span className="balance-breakdown">
            <span className="breakdown-income">+{formatCurrency(totalIncome)}</span>
            <span className="breakdown-sep">·</span>
            <span className="breakdown-expense">−{formatCurrency(totalExpenses)}</span>
          </span>
        </div>
      </div>

      <div className="summary-card income-card">
        <div className="mini-card-header">
          <div className="mini-icon income-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span className="mini-label">Income</span>
        </div>
        <p className="mini-amount income-amount">{formatCurrency(totalIncome)}</p>
      </div>

      <div className="summary-card expense-card">
        <div className="mini-card-header">
          <div className="mini-icon expense-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <span className="mini-label">Expenses</span>
        </div>
        <p className="mini-amount expense-amount">{formatCurrency(totalExpenses)}</p>
      </div>
    </div>
  );
}

export default Summary;
