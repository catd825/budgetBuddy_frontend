import React from 'react';
import { withRouter} from 'react-router-dom'
import TransactionItem from './TransactionItem';
import { Table, Button } from 'reactstrap';
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

    transAmount = () => {
      return this.filterTransactionsByMonth().map(transObj => {
          if(transObj.trans_type === "Expense"){
            return transObj.amount}
          else{
              return 0
          }
      })
  }

  routeChange=()=> {
    let path = `/transactions/new`;
    this.props.history.push(path)
  }




    render () {
      console.log("transactions", this.props.transactions)
      console.log("month", this.state)
        return (
            <>
            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
            {/* <Button onClick={this.routeChange}>Create New Budget</Button> */}
            <p>Total Transactions ${Math.round(this.transAmount().reduce((a,b) => a+b, 0),2)}</p>
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

export default withRouter(TransactionList)