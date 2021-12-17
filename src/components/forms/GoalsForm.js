import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createGoal, getGoals, updateGoal } from '../../api/data/goalsData';

const initialState = {
  name: '',
  category: '',
  goalTotal: '',
  currentValue: '',
  uid: '',
  type: 'goal',
};

export default function GoalsForm({
  obj, setEditItem, uid, setGoalCards, setChartLabels, setChartValues,
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
    formInput.currentValue *= 1;
    formInput.goalTotal *= 1;
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
      updateGoal(obj.firebaseKey, formInput).then(() => {
        getGoals(uid).then((goalsArray) => {
          setGoalCards(goalsArray);
          const cLabels = goalsArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = goalsArray.map((card) => card.goalTotal);
          setChartValues(cValues);
        });
        resetForm();
      });
    } else {
      createGoal({ ...formInput, uid }).then(() => {
        getGoals(uid).then((goalsArray) => {
          setGoalCards(goalsArray);
          const cLabels = goalsArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = goalsArray.map((card) => card.goalTotal);
          setChartValues(cValues);
        });
        resetForm();
      });
    }
  };

  return (
    <div className="goal-form-container">
      <form className="goal-form">
        <div className="form-group">
          <label className="form-label">
            <span className="form-text">Goal Name: </span>
            <input
              className="form-input"
              id="name"
              name="name"
              type="string"
              value={formInput.name}
              onChange={handleChange}
              required
              placeholder="Enter Goal Name"
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
              placeholder="Choose Goal Category"
            >
              <option value="Other">Choose Category</option>
              <option value="Retirement">Retirement</option>
              <option value="Savings">Savings</option>
              <option value="Debt Payoff">Debt Payoff</option>
              <option value="Stocks">Stocks</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Goal Total: </span>
            <input
              className="form-input"
              id="goalTotal"
              name="goalTotal"
              type="number"
              value={formInput.goalTotal}
              min="0"
              onChange={handleChange}
              required
              placeholder="Enter Goal Total"
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Current Value: </span>
            <input
              className="form-input"
              id="currentValue"
              name="currentValue"
              type="number"
              value={formInput.currentValue}
              min="0"
              onChange={handleChange}
              required
              placeholder="Enter Current Value"
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

GoalsForm.propTypes = {
  obj: PropTypes.shape(PropTypes.obj),
  setEditItem: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  setGoalCards: PropTypes.func.isRequired,
  setChartValues: PropTypes.func.isRequired,
  setChartLabels: PropTypes.func.isRequired,
};

GoalsForm.defaultProps = {
  obj: {},
};
