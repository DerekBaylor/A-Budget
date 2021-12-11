import React from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../../api/data/incomeData';

const totalIncome = (uid) => {
  getIncomes(uid).then((ordersArray) => {
    //   const reducer = (accum, currentValue) => accum + parseFloat(currentValue.income);
    const reducer = (accum, currentValue) => accum + currentValue.income;
    const incomeTot = ordersArray.reduce(reducer, 0);
    const totIncome = Math.round(incomeTot);
    document.querySelector('#total-income').innerHTML += `${totIncome}`;
  });
};

export default function TotalIncomeCard({ uid }) {
  totalIncome(uid);

  return (
    <div className="card total-card">
      <h3 id="total-income">Total Income: $</h3>
    </div>
  );
}

TotalIncomeCard.propTypes = {
  uid: PropTypes.string.isRequired,
};
