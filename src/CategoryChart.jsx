import { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

const CATEGORY_COLORS = {
  food: '#fbbf24',
  housing: '#60a5fa',
  utilities: '#c084fc',
  transport: '#38bdf8',
  entertainment: '#f472b6',
  salary: '#34d399',
  other: '#94a3b8',
};

const CHART_MODES = {
  PIE: 'pie',
  BAR: 'bar',
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="chart-tooltip">
        <span className="chart-tooltip-label">{entry.name}</span>
        <span className="chart-tooltip-value">
          ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    );
  }
  return null;
}

function CategoryLegend({ payload }) {
  if (!payload) return null;
  return (
    <div className="chart-legend">
      {payload.map((entry) => (
        <div key={entry.value} className="chart-legend-item">
          <span
            className="chart-legend-dot"
            style={{ backgroundColor: entry.color }}
          />
          <span className="chart-legend-label">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryChart({ transactions }) {
  const [chartMode, setChartMode] = useState(CHART_MODES.BAR);

  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 100) / 100,
    }))
    .sort((a, b) => b.value - a.value);

  const totalSpend = data.reduce((sum, d) => sum + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h3>Spending by Category</h3>
        </div>
        <div className="empty-chart">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-chart-icon">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          <p className="empty-desc">No expense data to display yet</p>
          <p className="empty-sub">Add expenses above to see your category breakdown</p>
        </div>
      </div>
    );
  }

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={110}
          dataKey="value"
          nameKey="name"
          paddingAngle={3}
          cornerRadius={6}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name.toLowerCase()] || '#94a3b8'}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CategoryLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          tickFormatter={(val) => `$${val}`}
        />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name.toLowerCase()] || '#94a3b8'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chart-title-icon">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          <h3>Spending by Category</h3>
          <span className="chart-total">${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="chart-toggle">
          <button
            className={`chart-toggle-btn ${chartMode === CHART_MODES.PIE ? 'active' : ''}`}
            onClick={() => setChartMode(CHART_MODES.PIE)}
            title="Pie chart view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </button>
          <button
            className={`chart-toggle-btn ${chartMode === CHART_MODES.BAR ? 'active' : ''}`}
            onClick={() => setChartMode(CHART_MODES.BAR)}
            title="Bar chart view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </button>
        </div>
      </div>
      {chartMode === CHART_MODES.PIE ? renderPieChart() : renderBarChart()}
    </div>
  );
}

export default CategoryChart;
