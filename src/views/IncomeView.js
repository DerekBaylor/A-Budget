import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../api/data/incomeData';
import IncomeCard from '../components/cards/IncomeCard';
import IncomeForm from '../components/forms/IncomeForm';
import IncomeChart from '../components/charts/IncomeChart';

export default function IncomeView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getIncomes(uid).then(setIncomeCards);
  }, []);

  return (
    <div className="income-view-container">
      <div>
        <IncomeChart uid={uid} />
      </div>
      <div>Income Legend</div>
      <hr />
      <div>
        <div className="income-card-container">
          {incomeCards.map((card) => (
            <IncomeCard
              key={card.firebaseKey}
              card={card}
              setIncomeCards={setIncomeCards}
              uid={uid}
              setEditItem={setEditItem}
            />
          ))}
        </div>
        <hr />
        <div>
          <IncomeForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setIncomeCards={setIncomeCards}
          />
        </div>
      </div>
    </div>
  );
}

IncomeView.propTypes = {
  uid: PropTypes.string,
};

IncomeView.defaultProps = {
  uid: '',
};
