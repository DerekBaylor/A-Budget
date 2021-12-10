import React from 'react';
import PropTypes from 'prop-types';
import { deleteAsset, getAssets } from '../../api/data/assetsData';

export default function AssetsCard({ card, uid, setEditItem }) {
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteAsset(card.firebaseKey).then(() => {
        getAssets(uid).then();
      });
    }
  };

  return (
    <div className="card asset-cards page-type-cards">
      <div>
        <div className="card-body">
          <div className="card-data">
            <button
              className="btn card-title"
              type="button"
              onClick={() => setEditItem(card)}
            >
              <h5>{card.name}</h5>
            </button>
            <div className="card-value">
              <h5>${card.value}</h5>
            </div>
          </div>
          <div className="card-info">
            <div className="card-text">
              <span>{card.category}</span>
            </div>
          </div>
        </div>
        <div className="card-btn-group">
          <button
            className="btn card-btn del-btn"
            type="button"
            onClick={() => handleDelete('delete')}
          >
            Delete Income
          </button>
        </div>
      </div>
    </div>
  );
}

AssetsCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
