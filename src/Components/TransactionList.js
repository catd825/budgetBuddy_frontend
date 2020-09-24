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
  return this.props.transactions.filter(transObj => {  //iterate over transactions 
    if(this.state.month === transObj.month){  //if the object's month matches the current month selected, return those transactions
      return transObj.month} else if (this.state.month === 0) {  //if the state is 0, return everything.
        return transObj
      }
          })
  }


    transList = () => {
        return this.filterTransactionsByMonth().map(transObj=> <TransactionItem key={transObj.id} transObj={transObj}/>)
    }

    render () {
      console.log("transactions", this.props.transactions)
      console.log("month", this.state)
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