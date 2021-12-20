import React from 'react';
import PropTypes from 'prop-types';

console.warn('delete me');

export default function MedicalTipCard({ card }) {
  return (
    <div className="card tip-cards page-type-cards">
      <div className="card-text">
        <span>{card.text}</span>
      </div>
    </div>
  );
}

MedicalTipCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
