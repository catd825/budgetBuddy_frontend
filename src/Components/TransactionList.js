import React from 'react';
import { withRouter} from 'react-router-dom'
import TransactionItem from './TransactionItem';
import { Table } from 'reactstrap';
import SummaryFilter from './SummaryFilter'
import TransactionFilter from './TransactionFilter'

class TransactionList extends React.Component {


  state = {month: 9,
          searchValue:''
        }

searchTransactions = () => {
  return this.props.transactions.filter(transObj => {
      return transObj.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || transObj.category_name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })
  }

  searchHandler = (e) => {
    this.setState({searchValue: e.target.value})
}

        

  changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}  

filterTransactionsByMonth = () => {
  return this.searchTransactions().filter(transObj => {  //iterate over transactions 
    if(this.state.month === transObj.month){  //if the object's month matches the current month selected, return those transactions
      return transObj.month} else if (this.state.month === 0) {  //if the state is 0, return everything.
        return transObj
      }
          })
  }


    transList = () => {
        return this.filterTransactionsByMonth().map(transObj=> <TransactionItem key={transObj.id} transObj={transObj}/>)
    }

    transTotal = () => {
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
            <br/><br/><br/><br/>
            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
            <div className="App" className="center"><TransactionFilter searchHandler={this.searchHandler} searchValue={this.state.searchValue} /></div>
            {/* <Button onClick={this.routeChange}>Create New Budget</Button> */}
            <p>Total Transactions ${Math.round(this.transTotal().reduce((a,b) => a+b, 0),2)}</p>
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