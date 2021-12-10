import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getExpenses } from '../api/data/expensesData';
import ExpensesCard from '../components/cards/ExpensesCard';
import ExpensesForm from '../components/forms/ExpensesForm';

export default function ExpensesView({ uid }) {
  const [expenseCards, setExpenseCards] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getExpenses(uid).then(setExpenseCards);
  }, []);
  console.warn('Exp View', uid);
  return (
    <div className="expense-view-container">
      <div>Expense Graph</div>
      <div>Expense Legend</div>
      <hr />
      <div>
        <div className="expense-card-container">
          {expenseCards.map((card) => (
            <ExpensesCard
              key={card.firebaseKey}
              card={card}
              setIncomeCards={setExpenseCards}
              uid={uid}
              setEditItem={setEditItem}
              obj={editItem}
            />
          ))}
        </div>
        <hr />
        <div>
          <ExpensesForm uid={uid} obj={editItem} setEditItem={setEditItem} />
        </div>
      </div>
    </div>
  );
}

ExpensesView.propTypes = {
  uid: PropTypes.string,
};

ExpensesView.defaultProps = {
  uid: '',
};
