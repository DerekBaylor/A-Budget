import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../api/data/incomeData';
import IncomeCard from '../components/cards/IncomeCard';
import IncomeForm from '../components/forms/IncomeForm';
import colors from '../helpers/colors';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function IncomeView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    getIncomes(uid).then((incomeArray) => {
      setIncomeCards(incomeArray);
      const cLabels = incomeArray.map((card) => card.name);
      setChartLabels(cLabels);
      const cValues = incomeArray.map((card) => card.income);
      setChartValues(cValues);
    });
  }, []);

  return (
    <div className="view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
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
          {incomeCards.map((card) => (
            <IncomeCard
              key={card.firebaseKey}
              card={card}
              setIncomeCards={setIncomeCards}
              uid={uid}
              setEditItem={setEditItem}
              setChartLabels={setChartLabels}
              setChartValues={setChartValues}
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
            setChartLabels={setChartLabels}
            setChartValues={setChartValues}
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
