import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createExpense,
  getExpenses,
  updateExpense,
} from '../../api/data/expensesData';

const initialState = {
  name: '',
  category: '',
  value: '',
  recurring: '',
  uid: '',
  type: 'expense',
};

export default function ExpensesForm({
  obj,
  setEditItem,
  uid,
  setExpenseCards,
  setChartLabels,
  setChartValues,
  setHousingTotal,
  setUtilityTotal,
  setVehicleTotal,
  setCCTotal,
  setMedTotal,
  setSubTotal,
  setFoodTotal,
  setEntrTotal,
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
      updateExpense(obj.firebaseKey, formInput).then(() => {
        getExpenses(uid).then((expenseArray) => {
          setExpenseCards(expenseArray);
          const cLabels = expenseArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = expenseArray.map((card) => card.value);
          setChartValues(cValues);

          const houseGroup = expenseArray.filter(
            (card) => card.category === 'Housing',
          );
          const [...housingCount] = houseGroup.map((card) => card.value);
          const totHousing = housingCount.reduce((a, b) => a + b, 0);
          setHousingTotal(totHousing);

          const utilityGroup = expenseArray.filter(
            (card) => card.category === 'Utilities',
          );
          const [...utilityCount] = utilityGroup.map((card) => card.value);
          const totUtility = utilityCount.reduce((a, b) => a + b, 0);
          setUtilityTotal(totUtility);

          const vehicleGroup = expenseArray.filter(
            (card) => card.category === 'Vehicle',
          );
          const [...vehicleCount] = vehicleGroup.map((card) => card.value);
          const totVehicle = vehicleCount.reduce((a, b) => a + b, 0);
          setVehicleTotal(totVehicle);

          const ccGroup = expenseArray.filter(
            (card) => card.category === 'Credit Card',
          );
          const [...ccCount] = ccGroup.map((card) => card.value);
          const totCC = ccCount.reduce((a, b) => a + b, 0);
          setCCTotal(totCC);

          const medGroup = expenseArray.filter(
            (card) => card.category === 'Medical',
          );
          const [...medCount] = medGroup.map((card) => card.value);
          const totMed = medCount.reduce((a, b) => a + b, 0);
          setMedTotal(totMed);

          const subGroup = expenseArray.filter(
            (card) => card.category === 'Subscriptions',
          );
          const [...subCount] = subGroup.map((card) => card.value);
          const totSub = subCount.reduce((a, b) => a + b, 0);
          setSubTotal(totSub);

          const foodGroup = expenseArray.filter(
            (card) => card.category === 'Food',
          );
          const [...foodCount] = foodGroup.map((card) => card.value);
          const totFood = foodCount.reduce((a, b) => a + b, 0);
          setFoodTotal(totFood);

          const entrGroup = expenseArray.filter(
            (card) => card.category === 'Entertainment',
          );
          const [...entrCount] = entrGroup.map((card) => card.value);
          const totEntr = entrCount.reduce((a, b) => a + b, 0);
          setEntrTotal(totEntr);
        });
        resetForm();
      });
    } else {
      createExpense({ ...formInput, uid }).then(() => {
        getExpenses(uid).then((expenseArray) => {
          setExpenseCards(expenseArray);
          const cLabels = expenseArray.map((card) => card.name);
          setChartLabels(cLabels);
          const cValues = expenseArray.map((card) => card.value);
          setChartValues(cValues);

          const houseGroup = expenseArray.filter(
            (card) => card.category === 'Housing',
          );
          const [...housingCount] = houseGroup.map((card) => card.value);
          const totHousing = housingCount.reduce((a, b) => a + b, 0);
          setHousingTotal(totHousing);

          const utilityGroup = expenseArray.filter(
            (card) => card.category === 'Utilities',
          );
          const [...utilityCount] = utilityGroup.map((card) => card.value);
          const totUtility = utilityCount.reduce((a, b) => a + b, 0);
          setUtilityTotal(totUtility);

          const vehicleGroup = expenseArray.filter(
            (card) => card.category === 'Vehicle',
          );
          const [...vehicleCount] = vehicleGroup.map((card) => card.value);
          const totVehicle = vehicleCount.reduce((a, b) => a + b, 0);
          setVehicleTotal(totVehicle);

          const ccGroup = expenseArray.filter(
            (card) => card.category === 'Credit Card',
          );
          const [...ccCount] = ccGroup.map((card) => card.value);
          const totCC = ccCount.reduce((a, b) => a + b, 0);
          setCCTotal(totCC);

          const medGroup = expenseArray.filter(
            (card) => card.category === 'Credit Card',
          );
          const [...medCount] = medGroup.map((card) => card.value);
          const totMed = medCount.reduce((a, b) => a + b, 0);
          setMedTotal(totMed);

          const subGroup = expenseArray.filter(
            (card) => card.category === 'Credit Card',
          );
          const [...subCount] = subGroup.map((card) => card.value);
          const totSub = subCount.reduce((a, b) => a + b, 0);
          setSubTotal(totSub);

          const foodGroup = expenseArray.filter(
            (card) => card.category === 'Food',
          );
          const [...foodCount] = foodGroup.map((card) => card.value);
          const totFood = foodCount.reduce((a, b) => a + b, 0);
          setFoodTotal(totFood);

          const entrGroup = expenseArray.filter(
            (card) => card.category === 'Entertainment',
          );
          const [...entrCount] = entrGroup.map((card) => card.value);
          const totEntr = entrCount.reduce((a, b) => a + b, 0);
          setEntrTotal(totEntr);
        });
        resetForm();
      });
    }
  };

  return (
    <div className="form-container">
      <form className="expense-form">
        <div className="form-group">
          <label className="form-label">
            <span className="form-text">Expense Name: </span>
            <input
              className="form-input"
              id="name"
              name="name"
              type="string"
              value={formInput.name}
              onChange={handleChange}
              required
              placeholder="Enter Expense Name"
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
        </div>
        <div>
          <label className="form-label">
            <span className="form-text">Monthly Amount: </span>
            <input
              className="form-input"
              id="value"
              name="value"
              type="number"
              value={formInput.value}
              min="0"
              onChange={handleChange}
              required
              placeholder="Enter Expense Amount"
            />
          </label>
        </div>
        <div>
          <div>
            <div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="gridCheck1">
                  <span className="form-text">Recurring Expense: </span>
                  <select
                    className="form-input"
                    id="recurring"
                    name="recurring"
                    onChange={handleChange}
                    required
                    value={formInput.recurring}
                  >
                    <option value="">Choose Option</option>
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
            <button
              className="btn btn-primary form-btn btn-warning"
              type="submit"
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

ExpensesForm.propTypes = {
  obj: PropTypes.shape(PropTypes.obj),
  setEditItem: PropTypes.func.isRequired,
  uid: PropTypes.string,
  setExpenseCards: PropTypes.func.isRequired,
  setChartValues: PropTypes.func.isRequired,
  setChartLabels: PropTypes.func.isRequired,
  setHousingTotal: PropTypes.func.isRequired,
  setUtilityTotal: PropTypes.func.isRequired,
  setVehicleTotal: PropTypes.func.isRequired,
  setCCTotal: PropTypes.func.isRequired,
  setMedTotal: PropTypes.func.isRequired,
  setSubTotal: PropTypes.func.isRequired,
  setFoodTotal: PropTypes.func.isRequired,
  setEntrTotal: PropTypes.func.isRequired,
};

ExpensesForm.defaultProps = {
  obj: {},
  uid: '',
};
