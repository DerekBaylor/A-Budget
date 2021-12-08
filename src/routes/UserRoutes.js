import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../views/HomeView';
import BudgetView from '../views/BudgetView';
import IncomeView from '../views/IncomeView';
import AssetsView from '../views/AssetsView';
import GoalsView from '../views/GoalsView';
import LiabilitiesView from '../views/LiabilitiesView';

export default function UserRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={() => <HomeView />} />
        <Route exact path="/budget" component={() => <BudgetView />} />
        <Route exact path="/income" component={() => <IncomeView />} />
        <Route
          exact
          path="/liabilities"
          component={() => <LiabilitiesView />}
        />
        <Route exact path="/assets" component={() => <AssetsView />} />
        <Route exact path="/goals" component={() => <GoalsView />} />
      </Switch>
    </>
  );
}
