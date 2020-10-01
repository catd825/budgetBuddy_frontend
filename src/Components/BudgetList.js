import React from 'react'
import BudgetItem from './BudgetItem'
import { withRouter} from 'react-router-dom'
import { Table, Button } from 'reactstrap';
import SummaryFilter from './SummaryFilter'
import CreateModalForm from './CreateModalForm'


class BudgetList extends React.Component {

  state = {month: 10}

  changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}  


    budgetList = () => {
        return this.filterBudgetsByMonth().map(budget => {
          if(budget.amount > 0){
            return <BudgetItem key={budget.id} editHandler={this.props.editHandler} deleteHelper={this.props.deleteHelper} budgetObj={budget}/>
          }
        })
    }


    filterBudgetsByMonth = () => {
      return this.props.budgets.filter(budgetObj => {  //iterate over transactions 
        if(this.state.month === budgetObj.month){  //if the object's month matches the current month selected, return those transactions
          return budgetObj.month} else if (this.state.month === 0) {  //if the state is 0, return everything.
            return budgetObj
          }
              })
      }


    routeChange=()=> {
      let path = `/budgets/new`;
      this.props.history.push(path)
    }
    
    render() {
      console.log(this.props)
        return(
            <>
            <>
              <br/><br/><br/><br/>
                <CreateModalForm currentUser={this.props.currentUser} submitHandler={this.props.submitHandler} budgets={this.props.budgets} categories={this.props.categories} parentComponent="budgetContainer" buttonLabel="Create a New Budget"/>      
                  {/* <Button onClick={this.routeChange}>Create New Budget</Button> */}
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