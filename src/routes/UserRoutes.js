import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeView from '../views/HomeView';
import BudgetView from '../views/BudgetView';
import IncomeView from '../views/IncomeView';
import AssetsView from '../views/AssetsView';
import GoalsView from '../views/GoalsView';
import LiabilitiesView from '../views/LiabilitiesView';

export default function UserRoutes({ uid }) {
  return (
    <>
      <Switch>
        <Route exact path="/" component={() => <HomeView uid={uid} />} />
        <Route
          exact
          path="/budget"
          component={() => <BudgetView uid={uid} />}
        />
        <Route
          exact
          path="/income"
          component={() => <IncomeView uid={uid} />}
        />
        <Route
          exact
          path="/liabilities"
          component={() => <LiabilitiesView uid={uid} />}
        />
        <Route
          exact
          path="/assets"
          component={() => <AssetsView uid={uid} />}
        />
        <Route exact path="/goals" component={() => <GoalsView uid={uid} />} />
      </Switch>
    </>
  );
}

UserRoutes.propTypes = {
  uid: PropTypes.string.isRequired,
};
