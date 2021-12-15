import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIncomes } from '../../api/data/incomeData';

export default function TotalIncomeCard({ uid }) {
  const [incomeTotal, setIncomeTotal] = useState([]);

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
};
