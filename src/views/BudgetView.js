import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../api/data/incomeData';
import { getExpenses } from '../api/data/expensesData';
import { getAssets } from '../api/data/assetsData';
import { getGoals } from '../api/data/goalsData';
import BvIncomeCard from '../components/cards/BvIncomeCard';
import BvExpensesCard from '../components/cards/BvExpenseCard';
import BvAssetsCard from '../components/cards/BvAssetsCard';
import BvGoalsCard from '../components/cards/BvGoalCard';
import colors from '../helpers/colors';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function BudgetView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [expenseCards, setExpenseCards] = useState([]);
  const [assetCards, setAssetCards] = useState([]);
  const [goalCards, setGoaleCards] = useState([]);
  const [incTotal, setIncTotal] = useState(0);
  const [expTotal, setExpTotal] = useState(0);
  const [astTotal, setAstTotal] = useState(0);

  useEffect(() => {
    getIncomes(uid).then((incomeArray) => {
      setIncomeCards(incomeArray);
    });
    getExpenses(uid).then((expArray) => {
      setExpenseCards(expArray);
    });

    getAssets(uid).then((astArray) => {
      setAssetCards(astArray);
    });
    getGoals(uid).then(setGoaleCards);
  }, [incTotal]);

  useEffect(() => {
    const [...incomeCount] = incomeCards.map((card) => card.income);
    const totalIncome = incomeCount.reduce((a, b) => a + b, 0);
    setIncTotal(totalIncome);
    const [...expCount] = expenseCards.map((card) => card.value);
    const totalExpenses = expCount.reduce((a, b) => a + b, 0);
    setExpTotal(totalExpenses);
    const [...astCount] = assetCards.map((card) => card.value);
    const totalAssets = astCount.reduce((a, b) => a + b, 0);
    setAstTotal(totalAssets);
  });

  return (
    <div className="view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
            labels: ['Total Income', 'Total Expenses', 'Total Assets'],
            datasets: [
              {
                data: [incTotal, expTotal, astTotal],
                backgroundColor: colors,
              },
            ],
          }}
        />
      </div>
      <hr />
      <div className="budget-breakdown-container">
        <h1>Category Breakdown</h1>
        <div className="card-container">
          <h2>Incomes</h2>
          {incomeCards?.map((card) => (
            <BvIncomeCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3 id="totalIncomes">Total Income: ${incTotal}</h3>
          </div>
        </div>
        <hr />
        <div className="card-container">
          <h2>Expenses</h2>
          {expenseCards.map((card) => (
            <BvExpensesCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3>Total Expenses: ${expTotal}</h3>
          </div>
        </div>
        <hr />
        <div className="card-container">
          <h2>Assets</h2>
          {assetCards.map((card) => (
            <BvAssetsCard key={card.firebaseKey} card={card} />
          ))}
          <div className="total-value">
            <h3>Total Assets: ${astTotal}</h3>
          </div>
        </div>
        <hr />
        <div className="card-container">
          <h2>Goals</h2>
          {goalCards.map((card) => (
            <BvGoalsCard key={card.firebaseKey} card={card} />
          ))}
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
