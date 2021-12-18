import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTip, updateTip } from '../../api/data/tipData';

const initialState = {
  name: '',
  category: '',
  desciption: '',
  showTip: true,
};

export default function TipForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateTip(obj.firebaseKey, formInput).then(() => {
        resetForm();
      });
    } else {
      createTip({ ...formInput }).then(() => {
        resetForm();
      });
    }
  };

  return (
    <div>
      <h1>Tip Form</h1>
      <div className="tip-form-container">
        <form className="tip-form">
          <label className="form-label">
            Tip Name:
            <input
              className="form-input"
              id="name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
              placeholder="Enter Tip Name"
            />
          </label>
          <label className="form-label">
            <span className="form-text">Category Name: </span>
            <select
              className="form-input"
              id="category"
              name="category"
              value={formInput.category}
              onChange={handleChange}
              required
              placeholder="Choose Expense Category"
            >
              <option value="">Choose Category</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Medical">Medical</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Living Expense">Living Expense</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="form-label">
            Tip Desciption:
            <input
              className="form-input"
              id="desciption"
              name="desciption"
              value={formInput.desciption}
              onChange={handleChange}
              required
              placeholder="Enter Tip Name"
              type="text"
            />
          </label>
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
    </div>
  );
}

TipForm.propTypes = {
  obj: PropTypes.shape(PropTypes.obj),
};

TipForm.defaultProps = {
  obj: {},
};
