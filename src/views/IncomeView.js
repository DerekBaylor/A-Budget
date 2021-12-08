import React from 'react';
import IncomeForm from '../components/forms/IncomeForm';

export default function IncomeView() {
  console.warn('Income View');
  return (
    <div className="income-view-container">
      <div>Income Graph</div>
      <hr />
      <div>
        <div>Income Overview</div>
        <div>Income List</div>
        <hr />
        <div>
          <IncomeForm />
        </div>
      </div>
    </div>
  );
}
