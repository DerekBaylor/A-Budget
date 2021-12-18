import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createAsset, getAssets, updateAsset } from '../../api/data/assetsData';

const initialState = {
  name: '',
  category: '',
  value: '',
  uid: '',
  type: 'asset',
};

export default function AssetsForm({
  obj,
  setEditItem,
  uid,
  setAssetCards,
  setChartLabels,
  setChartValues,
}) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else {
      setFormInput({ ...initialState });
    }
  }, [obj]);

  const valueConverter = () => {
    formInput.value *= 1;
  };

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
    valueConverter();

    if (obj.firebaseKey) {
      updateAsset(obj.firebaseKey, formInput).then(() => {
        getAssets(uid).then((assetArray) => {
          setAssetCards(assetArray);
          const cLabels = assetArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = assetArray.map((card) => card.value);
          setChartValues(cValues);
        });
        resetForm();
      });
    } else {
      createAsset({ ...formInput, uid }).then(() => {
        getAssets(uid).then((assetArray) => {
          setAssetCards(assetArray);
          const cLabels = assetArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = assetArray.map((card) => card.value);
          setChartValues(cValues);
        });
        resetForm();
      });
    }
  };

  return (
    <div className="form-container">
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
              <option value="">Choose Category</option>
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
          <button
            className="btn btn-primary form-btn btn-warning"
            type="submit"
            onClick={resetForm}
          >
            Clear
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
  setChartValues: PropTypes.func.isRequired,
  setChartLabels: PropTypes.func.isRequired,
};

AssetsForm.defaultProps = {
  obj: {},
};
