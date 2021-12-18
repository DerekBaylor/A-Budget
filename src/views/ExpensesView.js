import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getExpenses } from '../api/data/expensesData';
import { getIncomes } from '../api/data/incomeData';
import ExpensesCard from '../components/cards/ExpensesCard';
import ExpensesForm from '../components/forms/ExpensesForm';
// import TipCard from '../components/cards/TipCard';
import colors from '../helpers/colors';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function ExpensesView({ uid }) {
  const [expenseCards, setExpenseCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);
  const [income, setIncome] = useState([]);
  const [incTotal, setIncTotal] = useState(0);
  // const [housingData, setHousingData] = ([]);
  const [housingTotal, setHousingTotal] = useState(0);

  useEffect(() => {
    getExpenses(uid).then((expenseArray) => {
      setExpenseCards(expenseArray);
      const cLabels = expenseArray.map((card) => card.name);
      setChartLabels(cLabels);
      const cValues = expenseArray.map((card) => card.value);
      setChartValues(cValues);
      getIncomes(uid).then((incomeArray) => {
        setIncome(incomeArray);
      });
    });
  }, []);

  useEffect(() => {
    const [...incomeCount] = income.map((data) => data.income);
    const totalIncome = incomeCount.reduce((a, b) => a + b, 0);
    setIncTotal(totalIncome);
    getExpenses(uid).then((expenseArray) => {
      // console.warn('expenseArray', expenseArray);
      const houseGroup = expenseArray.filter(
        (data) => data.category === 'Housing',
      );
      console.warn('houseGroup', houseGroup);
      const [...housingCount] = houseGroup.map((data) => data.value);
      const totHousing = housingCount.reduce((a, b) => a + b, 0);
      setHousingTotal(totHousing);
      console.warn('totHousing', totHousing);
    });
  });
  console.warn('housingTotal2', housingTotal);
  console.warn('incTotal', incTotal);

  return (
    <div className="view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
            title: {
              display: true,
              text: 'Title',
            },
            labels: chartLabels,
            datasets: [
              {
                data: chartValues,
                backgroundColor: colors,
              },
            ],
          }}
        />
      </div>
      <hr />
      <div>
        <h1>Tips</h1>
        {/* <TipCard /> */}
      </div>
      <hr />
      <div>
        <div className="card-container">
          {expenseCards.map((card) => (
            <ExpensesCard
              key={card.firebaseKey}
              card={card}
              setExpenseCards={setExpenseCards}
              uid={uid}
              setEditItem={setEditItem}
              obj={editItem}
              setChartLabels={setChartLabels}
              setChartValues={setChartValues}
            />
          ))}
        </div>
        <hr />
        <div>
          <ExpensesForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setExpenseCards={setExpenseCards}
            setChartLabels={setChartLabels}
            setChartValues={setChartValues}
          />
        </div>
      </div>
    </div>
  );
}

ExpensesView.propTypes = {
  uid: PropTypes.string,
};

ExpensesView.defaultProps = {
  uid: '',
};
