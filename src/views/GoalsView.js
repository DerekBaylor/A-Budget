import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import GoalsCard from '../components/cards/GoalsCard';
import GoalsForm from '../components/forms/GoalsForm';
import { getGoals } from '../api/data/goalsData';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function GoalsView({ uid }) {
  const [goalCards, setGoalCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    getGoals(uid).then((goalsArray) => {
      setGoalCards(goalsArray);
      const cLabels = goalsArray.map((card) => card.name);
      setChartLabels(cLabels);
      const cValues1 = goalsArray.map((card) => card.goalTotal);
      const cValues2 = goalsArray.map((card) => card.currentValue);
      const totalValue = cValues1 - cValues2;
      console.warn('cV1', cValues1);
      console.warn('cV12', cValues2);
      console.warn('totalValue', totalValue);
      setChartValues(totalValue);
    }, []);
  });
  console.warn('chartValues', chartValues);
  return (
    <div className="goal-view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
            labels: chartLabels,
            datasets: [
              {
                data: chartValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
              },
            ],
          }}
        />
      </div>
      <hr />
      <div>
        <div className="goal-card-container">
          {goalCards.map((card) => (
            <GoalsCard
              key={card.firebaseKey}
              card={card}
              setGoalCards={setGoalCards}
              uid={uid}
              setEditItem={setEditItem}
              setChartLabels={setChartLabels}
              setChartValues={setChartValues}
            />
          ))}
        </div>
        <hr />
        <div>
          <GoalsForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setGoalCards={setGoalCards}
            setChartLabels={setChartLabels}
            setChartValues={setChartValues}
          />
        </div>
      </div>
    </div>
  );
}

GoalsView.propTypes = {
  uid: PropTypes.string,
};

GoalsView.defaultProps = {
  uid: '',
};
