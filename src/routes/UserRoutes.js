import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import BudgetView from '../views/BudgetView';
import IncomeView from '../views/IncomeView';
import AssetsView from '../views/AssetsView';
import GoalsView from '../views/GoalsView';
import ExpensesView from '../views/ExpensesView';

export default function UserRoutes({ uid }) {
  return (
    <>
      <Switch>
        <Route exact path="/" component={() => <BudgetView uid={uid} />} />
        <Route
          exact
          path="/income"
          component={() => <IncomeView uid={uid} />}
        />
        <Route
          exact
          path="/expenses"
          component={() => <ExpensesView uid={uid} />}
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
