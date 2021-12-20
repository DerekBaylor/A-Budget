import React from 'react';
import PropTypes from 'prop-types';
import { deleteExpense, getExpenses } from '../../api/data/expensesData';

export default function ExpensesCard({
  card,
  uid,
  setEditItem,
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
  const handleDelete = (method) => {
    if (method === 'delete') {
      deleteExpense(card.firebaseKey).then(() => {
        getExpenses(uid).then((expenseArray) => {
          setExpenseCards(expenseArray);
          const cLabels = expenseArray.map((crd) => crd.name);
          setChartLabels(cLabels);
          const cValues = expenseArray.map((crd) => crd.value);
          setChartValues(cValues);

          const houseGroup = expenseArray.filter(
            (crd) => crd.category === 'Housing',
          );
          const [...housingCount] = houseGroup.map((crd) => crd.value);
          const totHousing = housingCount.reduce((a, b) => a + b, 0);
          setHousingTotal(totHousing);

          const utilityGroup = expenseArray.filter(
            (crd) => crd.category === 'Utilities',
          );
          const [...utilityCount] = utilityGroup.map((crd) => crd.value);
          const totUtility = utilityCount.reduce((a, b) => a + b, 0);
          setUtilityTotal(totUtility);

          const vehicleGroup = expenseArray.filter(
            (crd) => crd.category === 'Vehicle',
          );
          const [...vehicleCount] = vehicleGroup.map((crd) => crd.value);
          const totVehicle = vehicleCount.reduce((a, b) => a + b, 0);
          setVehicleTotal(totVehicle);

          const ccGroup = expenseArray.filter(
            (crd) => crd.category === 'Credit Card',
          );
          const [...ccCount] = ccGroup.map((crd) => crd.value);
          const totCC = ccCount.reduce((a, b) => a + b, 0);
          setCCTotal(totCC);

          const medGroup = expenseArray.filter(
            (crd) => crd.category === 'Medical',
          );
          const [...medCount] = medGroup.map((crd) => crd.value);
          const totMed = medCount.reduce((a, b) => a + b, 0);
          setMedTotal(totMed);

          const subGroup = expenseArray.filter(
            (crd) => crd.category === 'Credit Card',
          );
          const [...subCount] = subGroup.map((crd) => crd.value);
          const totSub = subCount.reduce((a, b) => a + b, 0);
          setSubTotal(totSub);

          const foodGroup = expenseArray.filter(
            (crd) => crd.category === 'Food',
          );
          const [...foodCount] = foodGroup.map((crd) => crd.value);
          const totFood = foodCount.reduce((a, b) => a + b, 0);
          setFoodTotal(totFood);

          const entrGroup = expenseArray.filter(
            (crd) => crd.category === 'Entertainment',
          );
          const [...entrCount] = entrGroup.map((crd) => crd.value);
          const totEntr = entrCount.reduce((a, b) => a + b, 0);
          setEntrTotal(totEntr);
        });
      });
    }
  };

  return (
    <div className="card page-cards page-type-cards">
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
            <div className="card-text">
              <span>Recurring: {card.recurring}</span>
            </div>
          </div>
        </div>
        <div className="card-btn-group">
          <button
            className="btn card-btn del-btn"
            type="button"
            onClick={() => handleDelete('delete')}
          >
            Delete Expense
          </button>
        </div>
      </div>
    </div>
  );
}

ExpensesCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
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
