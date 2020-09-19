import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import TransactionList from '../Components/TransactionList'

class TransactionContainer extends React.Component {

    render () {
        return (
            <>
                {this.props.transactions === null 
                ? 
                    ""
                :
                <>
                <h1>transaction container</h1>
                    <Switch> 
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