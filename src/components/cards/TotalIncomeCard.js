import React, { useEffect, useState } from 'react';
// import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../../api/data/incomeData';

// const totalIncome = (uid) => {
//   getIncomes(uid).then((incomeArray) => {
//     // const reducer = (accum, currentValue) => accum + parseFloat(currentValue.income);
//     // const reducer = (accum, currentValue) => accum + currentValue.income;
//     // const incomeTot = incomeArray.reduce(reducer, 0);
//     // const totIncome = Math.round(incomeTot);
//     // document.querySelector('#total-income').innerHTML += `${totIncome}`;
//     const incomeTotal = incomeArray.reduce((totIncome, jobIncome) => totIncome + jobIncome.income, 0);
//     return incomeTotal;
//   });
// };

// const initialState = {
//   income: 0,
// };
export default function TotalIncomeCard({ uid }) {
  const [incomeTotal, setIncomeTotal] = useState(0);

  //   useEffect(() => {
  //     if (obj.firebaseKey) {
  //       setTotalVal(obj.income);
  //     } else {
  //       setTotalVal({ ...initialState });
  //     }
  //   }, []);

  // const totalIncome = incomeTotal.reduce(incomeSum(prev, current) {
  //     return: prev + current.income
  // }, 0);

  useEffect(() => {
    getIncomes(uid).then(setIncomeTotal);
  }, []);

  return (
    <div className="card total-card">
      <h3 id="total-income">Total Income: {incomeTotal}</h3>
    </div>
  );
}

TotalIncomeCard.propTypes = {
  uid: PropTypes.string.isRequired,
  //   obj: PropTypes.shape(PropTypes.obj),
  //   setTotalVal: PropTypes.func.isRequired,
};

// TotalIncomeCard.defaultProps = {
//   obj: {},
// };
