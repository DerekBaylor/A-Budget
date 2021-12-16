import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../api/data/incomeData';
import IncomeCard from '../components/cards/IncomeCard';
import IncomeForm from '../components/forms/IncomeForm';
// import IncomeChart from '../components/charts/IncomeChart';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function IncomeView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  // const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    getIncomes(uid).then((incomeArray) => {
      setIncomeCards(incomeArray);
    });
  }, []);

  useEffect(() => {
    const [...cLabels] = incomeCards.map((card) => card.category);
    const thing2 = cLabels.valueOf;
    console.warn('a2', thing2);
    setChartLabels(cLabels);
    // const [...cValues] = incomeCards.map((card) => card.income);
    // const thing3 = cValues.valueOf;
    // setChartValues(thing3);
  }, []);

  console.warn('a3', chartLabels);
  // console.warn('a4', chartValues);
  return (
    <div className="income-view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          // datasetIdKey="id"
          data={{
            labels: ['Jun', 'Jul', 'Aug'],
            // labels: chartLabels,
            datasets: [
              {
                id: 1,
                label: '',
                data: [5, 6, 7],
              },
            ],
          }}
        />
      </div>
      <hr />
      <div>
        <div className="income-card-container">
          {incomeCards.map((card) => (
            <IncomeCard
              key={card.firebaseKey}
              card={card}
              setIncomeCards={setIncomeCards}
              uid={uid}
              setEditItem={setEditItem}
            />
          ))}
        </div>
        <hr />
        <div>
          <IncomeForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setIncomeCards={setIncomeCards}
          />
        </div>
      </div>
    </div>
  );
}

IncomeView.propTypes = {
  uid: PropTypes.string,
};

IncomeView.defaultProps = {
  uid: '',
};
