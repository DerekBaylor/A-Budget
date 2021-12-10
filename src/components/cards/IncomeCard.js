import React from 'react';
import PropTypes from 'prop-types';
import { deleteIncome, getIncomes } from '../../api/data/incomeData';

export default function IncomeCard({
  card,
  setCards,
  uid,
  setEditItem,
}) {
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
          <button
            className="btn card-title"
            type="button"
            onClick={() => setEditItem(card)}
          >
            <span>{card.name}</span>
          </button>
          <div className="card-text">
            <span>${card.income}</span>
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

IncomeCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
