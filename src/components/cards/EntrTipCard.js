import React from 'react';
import PropTypes from 'prop-types';

export default function EntrTipCard({ card }) {
  return (
    <div className="card tip-cards page-type-cards">
      <div className="card-text">
        <span>{card.text}</span>
      </div>
    </div>
  );
}

EntrTipCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
