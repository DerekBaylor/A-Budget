import React from 'react';
import PropTypes from 'prop-types';
import { deleteExpense, getExpenses } from '../../api/data/expensesData';

export default function ExpensesCard({
  card, setCards, uid, setEditItem,
}) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteExpense(card.firebaseKey).then(() => {
        getExpenses(uid).then(setCards);
      });
    }
  };
  console.warn('Exp Card', uid);
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
        <div className="card-btn-group">
          <button
            className="btn card-btn del-btn"
            type="button"
            onClick={() => handleDelete('delete')}
          >
            Delete Expense
          </button>
        </div>
      </div>
    </div>
  );
}

ExpensesCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
};