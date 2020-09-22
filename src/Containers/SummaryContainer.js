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
        bank_accounts: null,
        categories: null,
        users: null
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

    fetchCategories = () => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(retrievedCategories => {
            this.setState({
                categories : [...retrievedCategories],
            })
        })
    }

    fetchUsers = () => {
        fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(retrievedUsers => {
            this.setState({
                users : [...retrievedUsers],
            })
        })
    }



    editBudgetHandler = (budgetObj) => {
        console.log(budgetObj)
        let id = budgetObj.id
        let budgetArray = [...this.state.budgets]
        let newBudgetArray = budgetArray.filter(budget => budget.id !== id)
      
        const configObj = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(budgetObj)
        }
      
        fetch(`http://localhost:3000/user_categories/${id}`, configObj)
        .then(response => response.json())
        .then(revisedBudget => {    
          this.setState({
              budgets: [...newBudgetArray, revisedBudget]
          })
          this.props.history.push(`/budgets`)
          })
      }

      createBudgetHandler = (obj) => {
          let find_category_obj = this.state.categories.find(category => obj.category_name === category.name)
          let newBudgetObj = {...obj, category_id: find_category_obj.id}

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            'body': JSON.stringify(newBudgetObj)
        }

        fetch("http://localhost:3000/user_categories", configObj)
        .then(response => response.json())
        .then(newObj => {
            this.setState({
                budgets: [...this.state.budgets, newObj]
            })
            this.props.history.push(`/budgets`)
        })

        }
  
        deleteHandler = (obj) => {
            let id = obj.id
            let currentBudgetArray = [...this.state.budgets]
            let newBudgetArray = currentBudgetArray.filter(budget => budget.id !== id)
            this.setState({budgets: newBudgetArray})

            const configObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }

            fetch(`http://localhost:3000/user_categories/${id}`, configObj)
            .then(response => response.json())

        }


    componentDidMount () {
        this.fetchBudgets()
        this.fetchTransactions()
        this.fetchBankAccounts()
        this.fetchCategories()
        this.fetchUsers()
    }

    render () {
        return (
            <> 
            <div>
            <Switch>
                <Route path="/budgets" render={() => <BudgetContainer deleteHelper={this.deleteHandler} submitHandler={this.createBudgetHandler} editHandler={this.editBudgetHandler} categories={this.state.categories} budgets={this.state.budgets} users={this.state.users} />} />
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