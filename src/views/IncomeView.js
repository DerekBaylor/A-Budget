import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../api/data/incomeData';
import IncomeCard from '../components/cards/IncomeCard';
import IncomeForm from '../components/forms/IncomeForm';

export default function IncomeView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);

  useEffect(() => {
    getIncomes().then(setIncomeCards);
  }, []);

  console.warn(uid);
  return (
    <div className="income-view-container">
      <div>Income Graph</div>
      <div>Income Percentage Breakdown</div>
      <hr />
      <div>
        <div className="income-card-container">
          {incomeCards.map((card) => (
            <IncomeCard
              key={card.firebaseKey}
              card={card}
              setCards={setIncomeCards}
              uid={uid}
            />
          ))}
        </div>
        <hr />
        <div>
          <IncomeForm />
        </div>
      </div>
    </div>
  );
}

IncomeView.propTypes = {
  uid: PropTypes.string.isRequired,
};
