import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
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
        categories: null
    }
    

    componentDidMount () {
        if(this.props.user){
            // this.fetchUsers()
            const token = this.props.getToken()
            this.fetchBudgets(token)
            this.fetchTransactions(token)
            this.fetchBankAccounts(token)
            this.fetchCategories(token)
        }
    }


    fetchBudgets = (token) => {
        // const token = this.props.getToken()
        
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/user_categories`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedBudgets => {
            // debugger
            this.setState({
                budgets : [...retrievedBudgets]
            })
        })
    }

    fetchTransactions = (token) => {
        // const token = this.props.getToken()
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
        // const token = this.props.getToken()
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
        // const token = this.props.getToken()
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/categories`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then(response => response.json())
        .then(retrievedCategories => {
            this.setState({
                categories : [...retrievedCategories]
            })
        })
    }

    // fetchUsers = () => {
    //     fetch("http://localhost:3000/api/v1/users")
    //     .then(response => response.json())
    //     .then(retrievedUsers => {
    //         this.setState({
    //             users : [...retrievedUsers],
    //         })
    //     })
    // }



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
        //   let month = new Date(obj.date).getMonth() + 1
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

        createTransHandler = (obj) => {
            console.log(obj)
            // let find_category_obj = this.state.categories.find(category => obj.category_name === category.name)
          //   let month = new Date(obj.date).getMonth() + 1
            // let newBudgetObj = {...obj, category_id: find_category_obj.id}
  
        //   const configObj = {
        //       method: 'POST',
        //       headers: {
        //           'Content-Type': 'application/json',
        //           'Accept': 'application/json',
        //       },
        //       'body': JSON.stringify(newBudgetObj)
        //   }
  
        //   fetch("http://localhost:3000/user_categories", configObj)
        //   .then(response => response.json())
        //   .then(newObj => {
        //       this.setState({
        //           budgets: [...this.state.budgets, newObj]
        //       })
        //       this.props.history.push(`/budgets`)
        //       })
          }



        editTransactionHandler = (transObj) => {
            console.log(transObj)
            let id = transObj.id
            let transArray = [...this.state.transactions]
            let newTransArray = transArray.filter(trans => trans.id !== id)
          
            const configObj = {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(transObj)
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

    render () {

        
        console.log("this.props.user", this.props.user.id)

        return (

            <>
            {this.props.user ? <> 
            <div>
            <Switch>
                <Route path="/budgets" render={() => <BudgetContainer deleteHelper={this.deleteHandler} submitHandler={this.createBudgetHandler} editHandler={this.editBudgetHandler} categories={this.state.categories} budgets={this.state.budgets} users={this.state.users} currentUser={this.props.user} />} />
                <Route path="/transactions" render={() => <TransactionContainer editHandler={this.editTransactionHandler} transactions={this.state.transactions} categories={this.state.categories} users={this.state.users} submitHandler={this.createTransHandler} currentUser={this.props.user} bank_accounts={this.state.bank_accounts} />} />
                <Route path="/" render={() =>  <SummaryComponent budgets={this.state.budgets} transactions={this.state.transactions} bank_accounts={this.state.bank_accounts} currentUser={this.props.user} />} />
            </Switch>
            </div>
            </> : 
                <>
                <Redirect to="/signup" />
                </>
            }
        </>

        )
    }

}

export default withRouter(SummaryContainer)