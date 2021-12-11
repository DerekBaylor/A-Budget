import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createIncome,
  getIncomes,
  updateIncome,
} from '../../api/data/incomeData';

const initialState = {
  name: '',
  category: '',
  income: '',
  freq: '0',
  recurring: false,
  uid: '',
  type: 'income',
};

export default function IncomeForm({
  obj, setEditItem, uid, setIncomeCards,
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
      updateIncome(obj.firebaseKey, formInput).then(() => {
        getIncomes(uid).then(setIncomeCards);
        resetForm();
      });
    } else {
      createIncome({ ...formInput, uid }).then(() => {
        getIncomes(uid).then(setIncomeCards);
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
              <option value="Other">Choose Category</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Gig">Gig Work</option>
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
              id="freq"
              name="freq"
              onChange={handleChange}
              required
              value={formInput.freq}
            >
              <option value="0">Choose Frequency</option>
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
                  <span className="form-text">Recurring Income:</span>
                  <select
                    className="form-input"
                    id="recurring"
                    name="recurring"
                    onChange={handleChange}
                    required
                    value={formInput.recurring}
                  >
                    <option value="false">Choose Option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </label>
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
  uid: PropTypes.string.isRequired,
  setIncomeCards: PropTypes.func.isRequired,
};

IncomeForm.defaultProps = {
  obj: {},
};
