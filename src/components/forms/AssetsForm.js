import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createAsset, getAssets, updateAsset } from '../../api/data/assetsData';

const initialState = {
  name: '',
  category: '',
  value: '',
  uid: '',
};

export default function AssetsForm({
  obj, setEditItem, uid, setAssetCards,
}) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else {
      setFormInput({ ...initialState });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateAsset(obj.firebaseKey, formInput).then(() => {
        getAssets(uid).then(setAssetCards);
        resetForm();
      });
    } else {
      createAsset({ ...formInput, uid }).then(() => {
        getAssets(uid).then(setAssetCards);
        resetForm();
      });
    }
  };

  return (
    <div className="asset-form-container">
      <form className="asset-form">
        <div className="form-group">
          <label className="form-label">
            <span className="form-text">Asset Name: </span>
            <input
              className="form-input"
              id="name"
              name="name"
              type="string"
              value={formInput.name}
              onChange={handleChange}
              required
              placeholder="Enter Asset Name"
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Category Name: </span>
            <select
              className="form-input"
              id="category"
              name="category"
              value={formInput.category}
              onChange={handleChange}
              required
              placeholder="Choose Asset Category"
            >
              <option value="Other">Choose Category</option>
              <option value="Retirement">Retirement</option>
              <option value="Savings">Savings</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Stocks">Stocks</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Asset Value: </span>
            <input
              className="form-input"
              id="value"
              name="value"
              type="number"
              value={formInput.value}
              min="0"
              onChange={handleChange}
              required
              placeholder="Enter Value"
            />
          </label>
        </div>
        <div className="form-btn-group">
          <button
            className="btn btn-primary form-btn btn-success"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

AssetsForm.propTypes = {
  obj: PropTypes.shape(PropTypes.obj),
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
  setAssetCards: PropTypes.func.isRequired,
};

AssetsForm.defaultProps = {
  obj: {},
};
