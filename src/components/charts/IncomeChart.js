import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';

Chart.register(ArcElement, Title, Legend, Tooltip);
// import PropTypes from 'prop-types';

const data = {
  labels: ['Red', 'Blue', 'Green', 'Orange'],
  datasets: [
    {
      data: [1, 2, 3, 4],
      backgroundColor: ['red', 'blue', 'green', 'orange'],
    },
  ],
};

export default function IncomeChart() {
  // export default function IncomeChart({ uid, obj }) {
  return (
    <div style={{ width: '20rem' }}>
      <Doughnut data={data} />
    </div>
  );
}

// IncomeChart.propTypes = {
//   uid: PropTypes.string.isRequired,
//   obj: PropTypes.shape(PropTypes.obj).isRequired,
// };
