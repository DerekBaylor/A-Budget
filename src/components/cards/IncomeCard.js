import React from 'react';
import PropTypes from 'prop-types';
import { deleteIncome, getIncomes } from '../../api/data/incomeData';

export default function IncomeCard({
  card, uid, setEditItem, setIncomeCards,
}) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteIncome(card.firebaseKey).then(() => {
        getIncomes(uid).then(setIncomeCards);
      });
    }
  };

  return (
    <div className="card income-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <button
              className="btn card-title"
              type="button"
              onClick={() => setEditItem(card)}
            >
              <h5>{card.name}</h5>
            </button>
            <div className="card-value">
              <h5>${card.income}</h5>
            </div>
            <div className="card-value">
              <h5>{card.totValue}</h5>
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
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
  setIncomeCards: PropTypes.func.isRequired,
};
