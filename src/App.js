import React from 'react';
import './App.css';
import { Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import SummaryContainer from './Containers/SummaryContainer'
// import TransactionContainer from './Containers/TransactionContainer'
// import BudgetContainer from './Containers/BudgetContainer'
// import Link from './Components/Link';

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path="/" render={(routerProps) => <SummaryContainer/>}/>
        {/* <Route path="/transactions" render={(routerProps) => <TransactionContainer/>} />
        <Route path="/budgets" render={(routerProps) => <BudgetContainer/>} /> */}
      </Switch>
    </>
  );
}

export default withRouter(App);
