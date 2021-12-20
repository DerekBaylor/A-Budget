import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import { getExpenses } from '../api/data/expensesData';
import { getIncomes } from '../api/data/incomeData';
import { getTips } from '../api/data/tipData';
import ExpensesCard from '../components/cards/ExpensesCard';
import ExpensesForm from '../components/forms/ExpensesForm';
import HousingTipCard from '../components/cards/HousingTipCard';
import UtilityTipCard from '../components/cards/UtilityTipCard';
import VehicleTipCard from '../components/cards/VehicleTipCard';
import MedicalTipCard from '../components/cards/MedicalTipCard';
import CCTipCard from '../components/cards/CCTipCard';
import SubTipCard from '../components/cards/SubTipCard';
import FoodTipCard from '../components/cards/FoodTipCard';
import EntrTipCard from '../components/cards/EntrTipCard';
import colors from '../helpers/colors';

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function ExpensesView({ uid }) {
  const [expenseCards, setExpenseCards] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);
  const [income, setIncome] = useState([]);
  const [incTotal, setIncTotal] = useState(0);
  const [housingTotal, setHousingTotal] = useState(0);
  const [housingTips, setHousingTips] = useState([]);
  const [utilityTotal, setUtilityTotal] = useState(0);
  const [utilityTips, setUtilityTips] = useState([]);
  const [vehicleTotal, setVehicleTotal] = useState(0);
  const [vehicleTips, setVehicleTips] = useState([]);
  const [ccTotal, setCCTotal] = useState(0);
  const [ccTips, setCCTips] = useState([]);
  const [medTotal, setMedTotal] = useState(0);
  const [medTips, setMedTips] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [subTips, setSubTips] = useState([]);
  const [foodTotal, setFoodTotal] = useState(0);
  const [foodTips, setFoodTips] = useState([]);
  const [entrTotal, setEntrTotal] = useState(0);
  const [entrTips, setEntrTips] = useState([]);

  const housingTip = () => {
    if (housingTotal / incTotal < 0.3 || incTotal === 0) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setHousingTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Housing');
        setHousingTips(tip);
      });
    }
  };

  const utilityTip = () => {
    if (utilityTotal < 500) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setUtilityTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Utilities');
        setUtilityTips(tip);
      });
    }
  };

  const vehicleTip = () => {
    if (vehicleTotal / incTotal < 0.1 || incTotal === 0) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setVehicleTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Vehicle');
        setVehicleTips(tip);
      });
    }
  };

  const ccTip = () => {
    if (ccTotal < 500) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setCCTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Credit Card');
        setCCTips(tip);
      });
    }
  };

  const medicalTip = () => {
    if (medTotal <= 500) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setMedTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Medical');
        setMedTips(tip);
      });
    }
  };

  const subscriptionTip = () => {
    if (subTotal < 100) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setSubTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter(
          (data) => data.category === 'Subscriptions',
        );
        setSubTips(tip);
      });
    }
  };

  const foodTip = () => {
    if (foodTotal < 300) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setFoodTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'Food');
        setFoodTips(tip);
      });
    }
  };

  const entrTip = () => {
    if (entrTotal < 300) {
      getTips().then((tipArray) => {
        const tip = tipArray.filter((data) => data.category === 'none');
        setEntrTips(tip);
      });
    } else {
      getTips().then((tipArray) => {
        const tip = tipArray.filter(
          (data) => data.category === 'Entertainment',
        );
        setEntrTips(tip);
      });
    }
  };

  useEffect(() => {
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

      const foodGroup = expenseArray.filter((card) => card.category === 'Food');
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
    getIncomes(uid).then((incomeArray) => {
      setIncome(incomeArray);
      const [...incomeCount] = income.map((data) => data.income);
      const totalIncome = incomeCount.reduce((a, b) => a + b, 0);
      setIncTotal(totalIncome);
    });
    housingTip(incTotal, housingTotal);
    utilityTip(incTotal, utilityTotal);
    vehicleTip(incTotal, vehicleTotal);
    ccTip(incTotal, ccTotal);
    medicalTip(incTotal, medTotal);
    subscriptionTip(incTotal, subTotal);
    foodTip(incTotal, foodTotal);
    entrTip(incTotal, entrTotal);
  }, [
    incTotal,
    housingTotal,
    utilityTotal,
    vehicleTotal,
    ccTotal,
    medTotal,
    subTotal,
    foodTotal,
    entrTotal,
  ]);

  return (
    <div className="view-container">
      <div style={{ width: '20rem' }}>
        <Doughnut
          data={{
            title: {
              display: true,
              text: 'Title',
            },
            labels: chartLabels,
            datasets: [
              {
                data: chartValues,
                backgroundColor: colors,
              },
            ],
          }}
        />
      </div>
      <hr />
      <div>
        <h1>Tips</h1>
        <div>
          {housingTips.map((card) => (
            <HousingTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {utilityTips.map((card) => (
            <UtilityTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {vehicleTips.map((card) => (
            <VehicleTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {ccTips.map((card) => (
            <CCTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {medTips.map((card) => (
            <MedicalTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {subTips.map((card) => (
            <SubTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {foodTips.map((card) => (
            <FoodTipCard key={1} card={card} />
          ))}
        </div>
        <div>
          {entrTips.map((card) => (
            <EntrTipCard key={1} card={card} />
          ))}
        </div>
      </div>
      <hr />
      <div>
        <div className="card-container">
          {expenseCards.map((card) => (
            <ExpensesCard
              key={card.firebaseKey}
              card={card}
              setExpenseCards={setExpenseCards}
              uid={uid}
              setEditItem={setEditItem}
              obj={editItem}
              setChartLabels={setChartLabels}
              setChartValues={setChartValues}
              setHousingTotal={setHousingTotal}
              setUtilityTotal={setUtilityTotal}
              setVehicleTotal={setVehicleTotal}
              setCCTotal={setCCTotal}
              setMedTotal={setMedTotal}
              setSubTotal={setSubTotal}
              setFoodTotal={setFoodTotal}
              setEntrTotal={setEntrTotal}
            />
          ))}
        </div>
        <hr />
        <div>
          <ExpensesForm
            uid={uid}
            obj={editItem}
            setEditItem={setEditItem}
            setExpenseCards={setExpenseCards}
            setChartLabels={setChartLabels}
            setChartValues={setChartValues}
            setHousingTotal={setHousingTotal}
            setUtilityTotal={setUtilityTotal}
            setVehicleTotal={setVehicleTotal}
            setCCTotal={setCCTotal}
            setMedTotal={setMedTotal}
            setSubTotal={setSubTotal}
            setFoodTotal={setFoodTotal}
            setEntrTotal={setEntrTotal}
          />
        </div>
      </div>
    </div>
  );
}

ExpensesView.propTypes = {
  uid: PropTypes.string,
};

ExpensesView.defaultProps = {
  uid: '',
};
