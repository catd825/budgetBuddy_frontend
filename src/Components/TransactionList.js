import React from 'react';
// import { Route, Switch, withRouter} from 'react-router-dom'
import TransactionItem from './TransactionItem';
import { Table } from 'reactstrap';

class TransactionList extends React.Component {

    transList = () => {
        return this.props.transactions.map(transObj=> <TransactionItem key={transObj.id} transObj={transObj}/>)
    }

    render () {
        return (
            <>
            <Table>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Category</th>
                <th>Transaction Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            {this.transList()}
            </Table>
            </>
        )
    }
}

export default TransactionList