import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../api/data/incomeData';
import { getExpenses } from '../api/data/expensesData';
import { getAssets } from '../api/data/assetsData';
import { getGoals } from '../api/data/goalsData';
import BvIncomeCard from '../components/cards/BvIncomeCard';
import BvExpensesCard from '../components/cards/BvExpenseCard';
import BvAssetsCard from '../components/cards/BvAssetsCard';
import BvGoalsCard from '../components/cards/BvGoalCard';

export default function BudgetView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [expenseCards, setExpenseCards] = useState([]);
  const [assetCards, setAssetCards] = useState([]);
  const [goalCards, setGoaleCards] = useState([]);
  const [incTotal, setIncTotal] = useState(0);

  useEffect(() => {
    getIncomes(uid).then((incomeArray) => {
      setIncomeCards(incomeArray);
    });
    // .then(() => {
    //   console.warn(incomeCards);
    //   const [...incomeCount] = incomeCards.map((card) => card.income);
    //   const totalIncome = incomeCount.reduce((a, b) => a + b, 0);
    //   console.warn(totalIncome);
    //   setIncTotal(totalIncome);
    // });
    getExpenses(uid).then(setExpenseCards);
    getAssets(uid).then(setAssetCards);
    getGoals(uid).then(setGoaleCards);
  }, []);

  useEffect(() => {
    // console.warn('2', incomeCards);
    const [...incomeCount] = incomeCards.map((card) => card.income);
    const totalIncome = incomeCount.reduce((a, b) => a + b, 0);
    setIncTotal(totalIncome);
  });

  return (
    <div className="budget-view-container">
      <div className="graph-container">
        <h1>Monthly Budget Graph</h1>
        <h2>Monthly Budget Legend</h2>
      </div>
      <hr />
      <div className="budget-breakdown-container">
        <h1>Category Breakdown</h1>
        <div className="budget-card-container">
          <h2 className="budget-income-cards">Incomes</h2>
          {incomeCards?.map((card) => (
            <BvIncomeCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3 id="totalIncomes">Total Income: $ {incTotal}</h3>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="budget-expenses-cards">Expenses</h2>
          {expenseCards.map((card) => (
            <BvExpensesCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3>Total Expenses:</h3>
            <h3>$1</h3>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="budget-assets-cards">Assets</h2>
          {assetCards.map((card) => (
            <BvAssetsCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3>Total Assets:</h3>
            <h3>$1</h3>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="budget-goals-cards">Goals</h2>
          {goalCards.map((card) => (
            <BvGoalsCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3>Total Goals:</h3>
            <h3>$1</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

BudgetView.propTypes = {
  uid: PropTypes.string,
};

BudgetView.defaultProps = {
  uid: '',
};
