import React from 'react';
import PropTypes from 'prop-types';

console.warn('delete me');

export default function SubTipCard({ card }) {
  return (
    <div className="card tip-cards page-type-cards">
      <div className="card-text">
        <span>{card.text}</span>
      </div>
    </div>
  );
}

SubTipCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
