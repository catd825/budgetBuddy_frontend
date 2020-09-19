import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import TransactionContainer from './TransactionContainer'
import BudgetContainer from './BudgetContainer'
// import BankAccountContainer from './BankAccountContainer'
import SummaryComponent from '../Components/SummaryComponent.js'
// import MyProgress from '../Components/MyProgress.js'


class SummaryContainer extends React.Component {


    state = {
        budgets: null,
        transactions: null,
        bank_accounts: null
    }
    
    fetchBudgets = () => {
        fetch("http://localhost:3000/user_categories")
        .then(response => response.json())
        .then(retrievedBudgets => {
            this.setState({
                budgets : [...retrievedBudgets],
            })
        })
    }

    fetchTransactions = () => {
        fetch("http://localhost:3000/transactions")
        .then(response => response.json())
        .then(retrievedTransactions => {
            this.setState({
                transactions : [...retrievedTransactions],
            })
        })
    }

    fetchBankAccounts = () => {
        fetch("http://localhost:3000/bank_accounts")
        .then(response => response.json())
        .then(retrievedAccounts => {
            this.setState({
                bank_accounts : [...retrievedAccounts],
            })
        })
    }

    componentDidMount () {
        this.fetchBudgets()
        this.fetchTransactions()
        this.fetchBankAccounts()
    }

    render () {
        return (
            <> 
            <div>
            <Switch>
                <Route path="/budgets" render={() => <BudgetContainer budgets={this.state.budgets} />} />
                <Route path="/transactions" render={() => <TransactionContainer transactions={this.state.transactions} />} />
                {/* <Route path="/bank_accounts" render={() => <BankAccountContainer bank_accounts={this.state.bank_accounts} />} /> */}
                <Route path="/" render={() =>  <SummaryComponent budgets={this.state.budgets} transactions={this.state.transactions} bank_accounts={this.state.bank_accounts} />} />
                {/* <Route path="/" render={() =>  <MyProgress budgets={this.state.budgets} transactions={this.state.transactions} bank_accounts={this.state.bank_accounts}/>} /> */}
            </Switch>
            </div>
            </>
        )
    }

}

export default withRouter(SummaryContainer)