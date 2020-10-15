import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import TransactionContainer from './TransactionContainer'
import BudgetContainer from './BudgetContainer'
import SummaryComponent from '../Components/SummaryComponent.js'


class SummaryContainer extends React.Component {


    state = {
        budgets: null,
        transactions: null,
        bank_accounts: null,
        categories: null
    }
    

    componentDidMount () {
        {
            const token = this.props.getToken()
            this.fetchBudgets(token)
            this.fetchBankAccounts(token)
            this.fetchCategories(token)
            this.fetchTransactions(token)
        }
    }


    fetchBudgets = (token) => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/user_categories`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedBudgets => {
            this.setState({
                budgets : [...retrievedBudgets]
            })
        })
    }

    fetchTransactions = (token) => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/transactions`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedTransactions => {
            this.setState({
                transactions : [...retrievedTransactions]
            })
        })
    }

    fetchBankAccounts = (token) => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/bank_accounts`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedAccounts => {
            this.setState({
                bank_accounts : [...retrievedAccounts]
            })
        })
    }

    fetchCategories = (token) => {
        fetch(`http://localhost:3000/categories`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedCategories => {
            this.setState({
                categories : [...retrievedCategories]
            }, ()=> console.log("fetch categories"))
        })
    }

    fetchUsers = (token) => {
        fetch("http://localhost:3000/api/v1/users", {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedUsers => {
            this.setState({
                users : [...retrievedUsers],
            })
        })
    }



    editBudgetHandler = (budgetObj) => {
        let id = budgetObj.id
        let budgetArray = [...this.state.budgets]
        let newBudgetArray = budgetArray.filter(budget => budget.id !== id)
        const token = this.props.getToken() 
      
        const configObj = {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(budgetObj)
        }
      
        fetch(`http://localhost:3000/user_categories/${id}`, configObj)
        .then(response => response.json())
        .then(
            revisedBudget => {    
          this.setState({
              budgets: [...newBudgetArray, budgetObj]
          }, () =>{this.props.history.push(`/budgets`)})
 
          }
          )
      }

      createBudgetHandler = (obj) => {
          let find_category_obj = this.state.categories.find(category => obj.category_name === category.name)
          let newBudgetObj = {...obj, category_id: find_category_obj.id}

        const token = this.props.getToken()  
        const configObj = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
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



        createTransHandler = (obj) => {
            let find_category_obj = this.state.categories.find(category => obj.category_name === category.name)
            let objMonth = new Date(obj.date).getMonth() + 1
            let newAmount = obj.trans_type === "Expense" ? -Math.abs(parseInt(obj.amount)) : parseInt(obj.amount)
            let newTransObj = {...obj, category_id: find_category_obj.id, month: objMonth, amount: newAmount, bank_account_id: 1}
            
          const token = this.props.getToken()  
          const configObj = {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              'body': JSON.stringify(newTransObj)
          }

  
          fetch("http://localhost:3000/transactions", configObj)
          .then(response => response.json())
          .then(newTransObj => {
              this.setState({
                  transactions: [...this.state.transactions, newTransObj]
              }, console.log(newTransObj))
              this.props.history.push(`/transactions`)
              })
          }
  



        editTransactionHandler = (transObj) => {
            console.log(transObj)
            let find_category_obj = this.state.categories.find(category => transObj.category_name === category.name)
            let revisedTrans =  {...transObj, category_id: find_category_obj.id}
           
            let id = transObj.id
            let transArray = [...this.state.transactions]
            let newTransArray = transArray.filter(trans => trans.id !== id)
            const token = this.props.getToken()
    
            const configObj = {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(revisedTrans)
            }

            fetch(`http://localhost:3000/transactions/${id}`, configObj)
            .then(response => response.json())
            .then(revisedTrans => {    
              this.setState({
                  transactions: [...newTransArray, revisedTrans]
              })
              this.props.history.push(`/transactions`)
              })
          }
  
        deleteBudgetHandler = (obj) => {
            const token = this.props.getToken()
            let id = obj.id
            let currentBudgetArray = [...this.state.budgets]
            let newBudgetArray = currentBudgetArray.filter(budget => budget.id !== id)
            this.setState({budgets: newBudgetArray})

            const configObj = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }

            fetch(`http://localhost:3000/user_categories/${id}`, configObj)
            .then(response => response.json())
        }


        deleteTransHandler = (obj) => {
            const token = this.props.getToken()
            let id = obj.id
            let currentTransArray = [...this.state.transactions]
            let newTransArray = currentTransArray.filter(trans => trans.id !== id)
            this.setState({transactions: newTransArray})

            const configObj = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }

            fetch(`http://localhost:3000/transactions/${id}`, configObj)
            .then(response => response.json())
        }



    render () {

        return (

            <>
             <> 
             <div className="App">
            <Switch>   
                <Route path="/budgets" render={() => <BudgetContainer deleteHelper={this.deleteBudgetHandler} submitHandler={this.createBudgetHandler} editHandler={this.editBudgetHandler} categories={this.state.categories} budgets={this.state.budgets} users={this.state.users} currentUser={this.props.user} />} />
                <Route path="/transactions" render={() => <TransactionContainer deleteHandler={this.deleteTransHandler} editHandler={this.editTransactionHandler} transactions={this.state.transactions} categories={this.state.categories} users={this.state.users} submitHandler={this.createTransHandler} currentUser={this.props.user} bank_accounts={this.state.bank_accounts} currentUser={this.props.user}/>} />
                <Route path="/" render={() =>  <SummaryComponent budgets={this.state.budgets} transactions={this.state.transactions} bank_accounts={this.state.bank_accounts} currentUser={this.props.user} />} />
            </Switch>
            </div>
            </> 
        </>

        )
    }

}

export default withRouter(SummaryContainer)