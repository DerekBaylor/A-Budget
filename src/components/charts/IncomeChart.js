import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../../api/data/incomeData';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function IncomeChart({ uid }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getIncomes(uid).then((dataArray) => {
      setChartData(dataArray);
    });
  }, []);

  // useEffect(() => {
  //   const chart = () => {
  //     const chartCat = [];
  //     const chartVal = [];
  //     getIncomes(uid)
  //       .then((response) => {
  //         console.warn('res', response);

  //         for (const dataObj of response.data) {
  //           chartCat.push(dataObj.categories);
  //           chartVal.push(dataObj.income);
  //         }
  //         setChartData({
  //           labels: chartCat,
  //           datasets: [{
  //             label: 'Income Breakdown',
  //             data: chartVal,
  //             backgroundColor: ['red', 'blue', 'green'],
  //           }],
  //         });
  //       });
  //   };
  // }, []);
  console.warn(chartData);

  return (
    <div style={{ width: '20rem' }}>
      <Doughnut data={chartData} />
    </div>
  );
}

IncomeChart.propTypes = {
  uid: PropTypes.string.isRequired,
};
