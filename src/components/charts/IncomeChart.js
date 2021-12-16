import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../../api/data/incomeData';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function IncomeChart({ uid }) {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    getIncomes(uid).then((dataArray) => {
      setChartData(dataArray);
    });
  }, []);
  console.warn('1', chartData.map);

  useEffect(() => {
    const cLabels = chartData.map();
    setChartLabels(cLabels);
  });

  console.warn('2', chartLabels);

  return (
    <div>
      <div style={{ width: '20rem' }}>
        <Doughnut
          // datasetIdKey="id"
          data={{
            labels: ['Jun', 'Jul', 'Aug'],
            datasets: [
              {
                id: 1,
                label: '',
                data: [5, 6, 7],
              },
              {
                id: 2,
                label: '',
                data: [3, 2, 1],
              },
            ],
          }}
        />
      </div>
      <h1>Chart</h1>
    </div>
  );
}

IncomeChart.propTypes = {
  uid: PropTypes.string.isRequired,
};
