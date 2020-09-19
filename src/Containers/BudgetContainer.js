import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import BudgetList from '../Components/BudgetList'
// import Summary from './Summary'

class BudgetContainer extends React.Component {


    render () {
        console.log(this.props)
        return (
            <>
                {this.props.budgets === null 
                ? 
                    ""
                :
                <>
                {/* <h1>budget container</h1> */}
                {/* <Summary /> */}
                    <Switch> 
                        <Route exact path="/budgets" render={() => <BudgetList budgets={this.props.budgets} />} />
                        {/* <Route exact path="/" render={() => <Summary budgets={this.props.budgets}/>} /> */}
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                    </>
                }
            </>        
        )
    }

}

export default withRouter(BudgetContainer)