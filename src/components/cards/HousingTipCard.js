import React from 'react';
import PropTypes from 'prop-types';

console.warn('delete me');

export default function HousingTipCard({ card }) {
  return (
    <div className="card tip-cards page-type-cards">
      <div className="card-text">
        <span>{card.text}</span>
      </div>
    </div>
  );
}

HousingTipCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
