import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import GoalsCard from '../components/cards/GoalsCard';
import GoalsForm from '../components/forms/GoalsForm';
import { getGoals } from '../api/data/goalsData';
import colors from '../helpers/colors';

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
      const totalValue = cValues1.map((num, idx) => num - cValues2[idx]);
      setChartValues(totalValue);
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
