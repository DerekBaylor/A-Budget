import React from 'react';
import PropTypes from 'prop-types';

export default function BvGoalsCard({ card }) {
  return (
    <div className="card goal-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <div className="card-title">
              <h5>{card.name}</h5>
            </div>
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
      </div>
    </div>
  );
}

BvGoalsCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
