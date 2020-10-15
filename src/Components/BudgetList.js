import React from 'react'
import BudgetItem from './BudgetItem'
import { withRouter} from 'react-router-dom'
import { Table } from 'reactstrap';
import SummaryFilter from './SummaryFilter'
import CreateModalForm from './CreateModalForm'


class BudgetList extends React.Component {

  state = {month: this.props.currentMonth}

  changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}  


    budgetList = () => {
        return this.filterBudgetsByMonth().map(budgetObj => budgetObj.amount > 0 ? <BudgetItem key={budgetObj.id} editHandler={this.props.editHandler} deleteHelper={this.props.deleteHelper} budgetObj={budgetObj}/> : "")
    }


    filterBudgetsByMonth = () => {
      return this.props.budgets.filter(budgetObj => this.state.month===budgetObj.month)
  }


    render() {
      console.log(this.props)
        return(
            <>
            <>
              <br/><br/><br/><br/>
                <CreateModalForm currentUser={this.props.currentUser} submitHandler={this.props.submitHandler} budgets={this.props.budgets} categories={this.props.categories} parentComponent="budgetContainer" buttonLabel="Create a New Budget"/>      
                <br/> 
                <SummaryFilter month={this.state.month} changeHandler={this.changeHandler} />
                <br/><br/>  
            <Table>
            <thead>
              <tr>
                <th></th>
                <th>Month</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
              {this.budgetList()}
            </Table>
            </>
            </>
        )
    }

}

export default withRouter(BudgetList)