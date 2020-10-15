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
                                foundTrans ? <TransactionEdit transactions={foundTrans} categories={this.props.categories} editHandler={this.props.editHandler} deleteHandler={this.props.deleteHandler} /> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route exact path="/transactions" render={() => <TransactionList submitHandler={this.props.submitHandler} currentUser={this.props.currentUser} deleteHandler={this.props.deleteHandler} editHandler={this.props.editHandler} categories={this.props.categories} transactions={this.props.transactions}/>} />
                    </Switch>
                    </>
                }
            </>        
        )
    }

}

export default withRouter(TransactionContainer)