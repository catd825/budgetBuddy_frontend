import React from 'react';
import { withRouter} from 'react-router-dom'
import TransactionItem from './TransactionItem';
import { Table } from 'reactstrap';
import SummaryFilter from './SummaryFilter'
import TransactionFilter from './TransactionFilter'
import CreateTransModalForm from './CreateTransModalForm'

class TransactionList extends React.Component {


  state = {month: this.props.currentMonth,
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
    return this.props.transactions.filter(transObj => this.state.month===transObj.month)
  }


  transList = () => {
    return this.filterTransactionsByMonth().map(transObj=> <TransactionItem deleteHandler={this.props.deleteHandler} editHandler={this.props.editHandler} key={transObj.id} categories={this.props.categories} transactions={transObj}/>)
  }

  expenseTotal = () => {
    return this.filterTransactionsByMonth().map(transObj => {
      if(transObj.trans_type === "Expense"){
        return transObj.amount}
      else{
        return 0
      }
    })
  }

  incomeTotal = () => {
    return this.filterTransactionsByMonth().map(transObj => {
        if(transObj.trans_type === "Income"){
          return transObj.amount}
        else{
            return 0
        }
    })
  }


    render () {

        return (
            <>
            <br/><br/><br/><br/>

            <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
            
            <div className="center">
              <br/><br/><br/><br/>
                <CreateTransModalForm currentUser={this.props.currentUser} submitHandler={this.props.submitHandler} budgets={this.props.budgets} categories={this.props.categories} parentComponent="transactionContainer" buttonLabel="Create a New Transaction"/>      
              <br/><br/>
                <TransactionFilter searchHandler={this.searchHandler} searchValue={this.state.searchValue} />
            </div>

            <br/>

              <p>Total Income ${Math.round(this.incomeTotal().reduce((a,b) => a+b, 0),2)}</p>
              <p>Total Expenses ${Math.round(this.expenseTotal().reduce((a,b) => a+b, 0),2)}</p>
              <p>Net Transactions ${Math.round(this.incomeTotal().reduce((a,b) => a+b, 0),2) + Math.round(this.expenseTotal().reduce((a,b) => a+b, 0),2)}</p>
            
            <br/>
            
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