import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GoalsCard from '../components/cards/GoalsCard';
import GoalsForm from '../components/forms/GoalsForm';
import { getGoals } from '../api/data/goalsData';

export default function GoalsView({ uid }) {
  const [goalCards, setGoalCards] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getGoals(uid).then(setGoalCards);
  }, []);

  return (
    <div className="goal-view-container">
      <div>Income Graph</div>
      <div>Income Legend</div>
      <hr />
      <div>
        <div className="goal-card-container">
          {goalCards.map((card) => (
            <GoalsCard
              key={card.firebaseKey}
              card={card}
              setIncomeCards={setGoalCards}
              uid={uid}
              setEditItem={setEditItem}
            />
          ))}
        </div>
        <hr />
        <div>
          <GoalsForm uid={uid} obj={editItem} setEditItem={setEditItem} />
        </div>
      </div>
    </div>
  );
}

GoalsView.propTypes = {
  uid: PropTypes.string,
};

GoalsView.defaultProps = {
  uid: '',
};
