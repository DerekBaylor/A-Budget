import React from 'react';
import PropTypes from 'prop-types';

export default function BvExpensesCard({ card }) {
  return (
    <div className="card income-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <div className="card-title">
              <h5>{card.name}</h5>
            </div>
            <div className="card-value">
              <h5>${card.value}</h5>
            </div>
          </div>
          <div className="card-info">
            <div className="card-text">
              <span>{card.category}</span>
            </div>
            <div className="card-text">
              <span>{card.freq}x/month</span>
            </div>
            <div className="card-text">
              <span>Recurring: {card.recurring}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BvExpensesCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
