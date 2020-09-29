import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import BudgetList from '../Components/BudgetList'
import BudgetEditForm from '../Components/BudgetEditForm'
import BudgetCreate from '../Components/BudgetCreate'


class BudgetContainer extends React.Component {


    render () {
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
                        <Route exact path="/budgets/new" render={() => <BudgetCreate submitHandler={this.props.submitHandler} currentUser={this.props.currentUser} categories={this.props.categories} budgets={this.props.budgets} />} />
                        <Route exact path="/budgets" render={() => <BudgetList editHandler={this.props.editHandler} deleteHelper={this.props.deleteHelper} budgets={this.props.budgets} />} />
                    </Switch>
                    </>
                }
            </>        
        )
    }

}

export default withRouter(BudgetContainer)