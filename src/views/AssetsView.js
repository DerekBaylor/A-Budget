import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAssets } from '../api/data/assetsData';
import AssetsCard from '../components/cards/AssetsCard';
import AssetsForm from '../components/forms/AssetsForm';

export default function AssetsView({ uid }) {
  const [assetCards, setAssetCards] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getAssets(uid).then(setAssetCards);
  }, []);

  return (
    <div className="asset-view-container">
      <div>Assets Graph</div>
      <div>Assets Legend</div>
      <hr />
      <div>
        <div className="asset-card-container">
          {assetCards.map((card) => (
            <AssetsCard
              key={card.firebaseKey}
              card={card}
              setAssetCards={setAssetCards}
              uid={uid}
              setEditItem={setEditItem}
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
