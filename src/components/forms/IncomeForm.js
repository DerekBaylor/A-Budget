import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createIncome, updateIncome } from '../../api/data/incomeData';

const initialState = {
  name: '',
  category: '',
  income: '0',
  paymentFreq: '',
  recurring: false, // bool Checkbox
};

export default function IncomeForm({ obj, setEditItem }) {
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
      updateIncome(obj.firebaseKey, formInput).then(() => {
        resetForm();
      });
    } else {
      createIncome({ ...formInput }).then(() => {
        resetForm();
      });
    }
  };

  return (
    <div className="income-form-container">
      <form className="income-form">
        <div className="form-group">
          <label className="form-label">
            <span className="form-text">Income Name:</span>
            <input
              className="form-input"
              id="name"
              name="name"
              type="string"
              value={formInput.name}
              onChange={handleChange}
              required
              placeholder="Enter Income Name"
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Category Name:</span>
            <select
              className="form-input"
              id="category"
              name="category"
              value={formInput.category}
              onChange={handleChange}
              required
              placeholder="Choose Income Category"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Once">Only Once</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Income Amount:</span>
            <input
              className="form-input"
              id="income"
              name="income"
              type="number"
              value={formInput.income}
              min="0"
              onChange={handleChange}
              required
              placeholder="Enter Income Amount"
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Payment Frequency:</span>
            <select
              className="form-input"
              id="paymentFreq"
              name="paymentFreq"
              onChange={handleChange}
              required
              value={formInput.paymentFreq}
            >
              <option value="1">Once Per Month</option>
              <option value="2">Twice Per Month</option>
              <option value="3">Three Times Per Month</option>
              <option value="4">Four Times Per Month</option>
            </select>
          </label>
          <div>
            <div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="gridCheck1">
                  <span className="form-text">Recurring Income</span>
                </label>
                <input className="form-check-input" type="checkbox" />
              </div>
            </div>
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
        </div>
      </form>
    </div>
  );
}

IncomeForm.propTypes = {
  obj: PropTypes.shape(PropTypes.obj),
  setEditItem: PropTypes.func.isRequired,
};

IncomeForm.defaultProps = {
  obj: {},
};
