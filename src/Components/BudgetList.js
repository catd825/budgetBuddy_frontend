import React from 'react'
import BudgetItem from './BudgetItem'
import { withRouter} from 'react-router-dom'
import { Table, Button } from 'reactstrap';


class BudgetList extends React.Component {
    
    budgetList = () => {
        return this.props.budgets.map(budget => {
          if(budget.amount>0){
          return <BudgetItem key={budget.id} deleteHelper={this.props.deleteHelper} budgetObj={budget} />
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
              <br/><br/>      
                    <Button onClick={this.routeChange}>Create New Budget</Button>
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
        )
    }

}

export default withRouter(BudgetList)