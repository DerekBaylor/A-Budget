import React from 'react';
import PropTypes from 'prop-types';
import { deleteGoal, getGoals } from '../../api/data/goalsData';

export default function GoalsCard({ card, uid, setEditItem }) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteGoal(card.firebaseKey).then(() => {
        getGoals(uid).then();
      });
    }
  };

  return (
    <div className="card goal-cards page-type-cards">
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
            Delete Income
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
};
