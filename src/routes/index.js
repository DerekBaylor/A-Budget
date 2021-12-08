import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../views/HomeView';
import IncomeView from '../views/IncomeView';
import BudgetView from '../views/BudgetView';
import LiabilitiesView from '../views/LiabilitiesView';
import AssetsView from '../views/AssetsView';
import GoalsView from '../views/GoalsView';
import SignInView from '../views/SignInView';

export default function Routes() {
  console.warn('Routes');
  return (
    <>
      <Switch>
        <Route exact path="/" componet={() => <HomeView />} />
        <Route exact path="/budget" componet={() => <BudgetView />} />
        <Route exact path="/income" componet={() => <IncomeView />} />
        <Route exact path="/liabilities" componet={LiabilitiesView} />
        <Route exact path="/assets" componet={AssetsView} />
        <Route exact path="/goals" componet={GoalsView} />
        <Route exact path="/signIn" componet={SignInView} />
      </Switch>
    </>
  );
}
