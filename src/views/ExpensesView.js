import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getExpenses } from '../api/data/expensesData';
import ExpensesCard from '../components/cards/ExpensesCard';
import ExpensesForm from '../components/forms/ExpensesForm';
import colors from '../helpers/colors';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function ExpensesView({ uid }) {
  const [expenseCards, setExpenseCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    getExpenses(uid).then((expenseArray) => {
      setExpenseCards(expenseArray);
      const cLabels = expenseArray.map((card) => card.name);
      setChartLabels(cLabels);
      console.warn('cLables', cLabels);
      const cValues = expenseArray.map((card) => card.value);
      setChartValues(cValues);
    });
  }, []);

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
