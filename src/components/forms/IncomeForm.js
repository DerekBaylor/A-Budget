import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createIncome, updateIncome } from '../../api/data/incomeData';

const initialState = {
  name: '',
  Category: '', // menu choice Full-Time, Part-Time, One-Time
  Income: '',
  PaymentFreq: '', // menu choice Once, Weekly, Bi-Weekly, Monthly
  Recurring: false, // bool Checkbox
};
export default function IncomeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateIncome(obj.firebaseKey, formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createIncome({ ...formInput }).then(() => {
        resetForm();
        history.push('/');
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
            <input
              className="form-input"
              id="name"
              name="name"
              value={formInput.category}
              onChange={handleChange}
              required
              placeholder="Choose Income Category"
            />
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
              id="freq"
              name="freq"
              onChange={handleChange}
              required
              value={formInput.freq}
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
};

IncomeForm.defaultProps = {
  obj: {},
};
