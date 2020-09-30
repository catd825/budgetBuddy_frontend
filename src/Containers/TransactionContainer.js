import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import TransactionList from '../Components/TransactionList'
import TransactionEdit from '../Components/TransactionEdit'
import TransactionCreate from '../Components/TransactionCreate'

class TransactionContainer extends React.Component {

    render () {

        return (
            <>
                {this.props.transactions === null 
                ? 
                    ""
                :
                <>
                    <Switch> 
                    <Route exact path="/transactions/:id/edit" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundTrans = this.props.transactions.find((trans) => trans.id ===id)
                            return (
                                foundTrans ? <TransactionEdit transObj={foundTrans} categories={this.props.categories} editHandler={this.props.editHandler} /> : <h3>Not Found</h3>
                            )
                        }}/>
                         <Route exact path="/transactions/new" render={() => <TransactionCreate submitHandler={this.props.submitHandler} bank_accounts={this.props.bank_accounts} categories={this.props.categories} budgets={this.props.budgets} />} />
                        <Route exact path="/transactions" render={() => <TransactionList transactions={this.props.transactions}/>} />
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                    </>
                }
            </>        
        )
    }

}

export default withRouter(TransactionContainer)