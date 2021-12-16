/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getIncomes } from '../api/data/incomeData';
import IncomeCard from '../components/cards/IncomeCard';
import IncomeForm from '../components/forms/IncomeForm';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function IncomeView({ uid }) {
  const [incomeCards, setIncomeCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);
  const [chartData, setChartData] = useState({});

  // useEffect(() => {
  //   getIncomes(uid).then((incomeArray) => {
  //     setIncomeCards(incomeArray);
  //     const cLabels = incomeCards.map((card) => card.name);
  //     setChartLabels(cLabels);
  //     const cValues = incomeCards.map((card) => card.income);
  //     setChartValues(cValues);
  //   });
  // }, []);

  // useEffect(() => {
  //   const cLabels = incomeCards.map((card) => card.name);
  //   setChartLabels(cLabels);
  //   const cValues = incomeCards.map((card) => card.income);
  //   setChartValues(cValues);
  // }, []);

  // useEffect(() => {
  //   getIncomes(uid).then((incomeArray) => {
  //     setIncomeCards(incomeArray);
  //   });
  // }, []);

  useEffect(() => {
    const cData = async () => {
      await getIncomes(uid).then((incomeArray) => {
        setIncomeCards(incomeArray);
        const cLabels = incomeCards.map((card) => card.name);
        setChartLabels(cLabels);
        const cValues = incomeCards.map((card) => card.income);
        setChartValues(cValues);
      });
      setChartData({
        labels: ['Jun', 'Jul', 'Aug'],
        // labels: chartLabels,
        datasets: [
          {
            data: [5, 6, 7],
            // data: chartValues,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
          },
        ],
      });
    };
    // cData();
    console.warn('cData', cData);
  }, []);

  console.warn('labels', chartLabels);
  console.warn('values', chartValues);
  return (
    <div className="income-view-container">
      <div style={{ width: '20rem' }}>
        {/* <Doughnut
          data={{
            // labels: ['Jun', 'Jul', 'Aug'],
            labels: chartLabels,
            datasets: [
              {
                // data: [5, 6, 7],
                data: chartValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
              },
            ],
          }}
        /> */}
        <Doughnut data={chartData} />
      </div>
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
