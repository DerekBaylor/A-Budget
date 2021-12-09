import React from 'react';
import PropTypes from 'prop-types';
import { deleteIncome, getIncomes } from '../../api/data/incomeData';

export default function IncomeCard({ card, setCards, uid }) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteIncome(card.firebaseKey).then(() => {
        getIncomes(uid).then(setCards);
      });
    }
  };

  return (
    <div className="card income-cards page-type-cards">
      <div className="card-body">
        <div className="card-data">
          {/* change to button */}
          <div className="card-title">
            <span>{card.name} :</span>
          </div>
          <div className="card-text">
            <span>${card.income}</span>
          </div>
        </div>
        <div className="card-btn-group">
          <button
            className="btn card-btn"
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

IncomeCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};
