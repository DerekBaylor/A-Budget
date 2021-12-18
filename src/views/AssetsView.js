import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getAssets } from '../api/data/assetsData';
import AssetsCard from '../components/cards/AssetsCard';
import AssetsForm from '../components/forms/AssetsForm';
import colors from '../helpers/colors';
// import { bottom } from '@popperjs/core';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function AssetsView({ uid }) {
  const [assetCards, setAssetCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    getAssets(uid).then((assetArray) => {
      setAssetCards(assetArray);
      const cLabels = assetArray.map((card) => card.name);
      setChartLabels(cLabels);
      const cValues = assetArray.map((card) => card.value);
      setChartValues(cValues);
    });
  }, []);

  return (
    <div className="view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
            labels: chartLabels,
            datasets: [
              {
                data: chartValues,
                backgroundColor: colors,
              },
            ],
          }}
        />
      </div>
      <hr />
      <div>
        <div className="card-container">
          {assetCards.map((card) => (
            <AssetsCard
              key={card.firebaseKey}
              card={card}
              setAssetCards={setAssetCards}
              uid={uid}
              setEditItem={setEditItem}
              setChartLabels={setChartLabels}
              setChartValues={setChartValues}
            />
          ))}
        </div>
        <hr />
        <div>
          <AssetsForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setAssetCards={setAssetCards}
            setChartLabels={setChartLabels}
            setChartValues={setChartValues}
          />
        </div>
      </div>
    </div>
  );
}

AssetsView.propTypes = {
  uid: PropTypes.string,
};

AssetsView.defaultProps = {
  uid: '',
};
