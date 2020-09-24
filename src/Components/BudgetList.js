import React from 'react'
import BudgetItem from './BudgetItem'
import { withRouter} from 'react-router-dom'
import { Table, Button } from 'reactstrap';
import SummaryFilter from './SummaryFilter'


class BudgetList extends React.Component {

  state = {month: 0}

  changeHandler = (e) => {
    this.setState({month: parseInt(e.target.value)})
}  


    budgetList = () => {
        return this.filterBudgetsByMonth().map(budget => {
          if(budget.amount > 0){
            return <BudgetItem key={budget.id} deleteHelper={this.props.deleteHelper} budgetObj={budget}/>
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
      console.log(this.state)
        return(
            <>
            <>
              <br/><br/>      
                    <Button onClick={this.routeChange}>Create New Budget</Button>
                <br/><br/>  
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