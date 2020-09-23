import React from 'react';
// import { Route, Switch, withRouter} from 'react-router-dom'
import TransactionItem from './TransactionItem';
import { Table } from 'reactstrap';
import SummaryFilter from './SummaryFilter'

class TransactionList extends React.Component {


  state = {month: 0}

  changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}  

filterTransactionsByMonth = () => {
  return this.props.transactions.filter(budgetObj => {
      return budgetObj.month === this.state.month ? this.state.month : 0
          })
  }


    transList = () => {
        return this.filterTransactionsByMonth().map(transObj=> <TransactionItem key={transObj.id} transObj={transObj}/>)
    }

    render () {
        return (
            <>
            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
            <Table>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Category</th>
                <th>Transaction Description</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            {this.transList()}
            </Table>
            </>
        )
    }
}

export default TransactionList