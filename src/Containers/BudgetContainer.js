import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import BudgetList from '../Components/BudgetList'
import BudgetEditForm from '../Components/BudgetEditForm'
import BudgetCreate from '../Components/BudgetCreate'


class BudgetContainer extends React.Component {


    render () {
        console.log(this.props)
        return (
            <>
                {this.props.budgets === null || this.props.users === null || this.props.categories === null
                ? 
                    ""
                :
                <>
                    <Switch> 
                        <Route exact path="/budgets/:id/edit" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundBudget = this.props.budgets.find((budget) => budget.id ===id)
                            return (
                                foundBudget ? <BudgetEditForm budgets={foundBudget} editHandler={this.props.editHandler} /> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route exact path="/budgets/new" render={() => <BudgetCreate currentUser={this.props.currentUser} submitHandler={this.props.submitHandler} categories={this.props.categories} budgets={this.props.budgets} />} />
                        <Route exact path="/budgets" render={() => <BudgetList currentMonth={this.props.currentMonth} currentUser={this.props.currentUser} submitHandler={this.props.submitHandler} editHandler={this.props.editHandler} categories={this.props.categories} deleteHelper={this.props.deleteHelper} budgets={this.props.budgets} />} />
                    </Switch>
                    </>
                }
            </>        
        )
    }

}

export default withRouter(BudgetContainer)