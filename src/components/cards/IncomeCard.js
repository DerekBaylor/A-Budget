import React from 'react';
import PropTypes from 'prop-types';
import { deleteIncome, getIncomes } from '../../api/data/incomeData';

export default function IncomeCard({
  card,
  uid,
  setEditItem,
  setIncomeCards,
  setChartLabels,
  setChartValues,
}) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteIncome(card.firebaseKey).then(() => {
        getIncomes(uid).then((incomeArray) => {
          setIncomeCards(incomeArray);
          const cLabels = incomeArray.map((crd) => crd.name);
          setChartLabels(cLabels);
          const cValues = incomeArray.map((crd) => crd.income);
          setChartValues(cValues);
        });
      });
    }
  };

  return (
    <div className="card page-cards page-type-cards">
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
          </div>
          <div className="card-info">
            <div className="card-text">
              <span>{card.category}</span>
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
  setChartValues: PropTypes.func.isRequired,
  setChartLabels: PropTypes.func.isRequired,
};
