import React from 'react';
import PropTypes from 'prop-types';
import { deleteGoal, getGoals } from '../../api/data/goalsData';

export default function GoalsCard({
  card,
  uid,
  setEditItem,
  setGoalCards,
  setChartLabels,
  setChartValues,
}) {
  const chartRefresh = () => {
    getGoals(uid).then((goalsArray) => {
      setGoalCards(goalsArray);
      const cLabels = goalsArray.map((crd) => crd.name);
      setChartLabels(cLabels);
      const cValues1 = goalsArray.map((crd) => crd.goalTotal);
      const cValues2 = goalsArray.map((crd) => crd.currentValue);
      const totalValue = cValues1.map((num, idx) => num - cValues2[idx]);
      setChartValues(totalValue);
    });
  };
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteGoal(card.firebaseKey).then(() => {
        getGoals(uid).then(setGoalCards);
      });
      chartRefresh();
    }
  };

  return (
    <div className="card page-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <button
              className="btn card-title"
              type="button"
              onClick={() => setEditItem(card)}
            >
              <h5>{card.name}</h5>
            </button>
            <div className="card-value">
              <h5>Goal Total: ${card.goalTotal}</h5>
            </div>
            <div className="card-value">
              <h5>Current Total: ${card.currentValue}</h5>
            </div>
          </div>
          <div className="card-info">
            <div className="card-text">
              <span>{card.category}</span>
            </div>
          </div>
        </div>
        <div className="card-btn-group">
          <button
            className="btn card-btn del-btn"
            type="button"
            onClick={() => handleDelete('delete')}
          >
            Complete Goal
          </button>
        </div>
      </div>
    </div>
  );
}

GoalsCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
  setGoalCards: PropTypes.func.isRequired,
  setChartValues: PropTypes.func.isRequired,
  setChartLabels: PropTypes.func.isRequired,
};
