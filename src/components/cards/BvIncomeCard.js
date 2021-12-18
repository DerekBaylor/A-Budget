import React from 'react';
import PropTypes from 'prop-types';

export default function BvIncomeCard({ card }) {
  return (
    <div className="card page-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <div className="card-title">
              <h5>{card.name}</h5>
            </div>
            <div className="card-value">
              <h5>${card.income}</h5>
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

BvIncomeCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
