import React from 'react';

export default function IncomeForm() {
  const initialState = {
    name: '',
    Category: '', // menu choice Full-Time, Part-Time, One-Time
    Income: '', // numeric
    PaymentFreq: '', // menu choice Once, Weekly, Bi-Weekly, Monthly
    Recurring: false, // bool Checkbox
  };

  console.warn(initialState);

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
              //   value={formInput.name}
              //   onChange={handleChange}
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
              //   value={formInput.name}
              //   onChange={handleChange}
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
              id="name"
              name="name"
              //   value={formInput.name}
              //   onChange={handleChange}
              required
              placeholder="Enter Income Amount"
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Payment Frequency:</span>
            <input
              className="form-input"
              id="name"
              name="name"
              //   value={formInput.name}
              //   onChange={handleChange}
              required
              placeholder="Choose Income Freqency"
            />
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
            <button type="submit" className="btn btn-primary form-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
