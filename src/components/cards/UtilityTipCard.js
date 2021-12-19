import React from 'react';
import PropTypes from 'prop-types';

export default function UtilityTipCard({ card }) {
  return (
    <div className="card tip-cards page-type-cards">
      <div className="card-text">
        <span>{card.text}</span>
      </div>
    </div>
  );
}

UtilityTipCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
