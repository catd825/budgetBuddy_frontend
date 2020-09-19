import React from 'react'
import BudgetItem from './BudgetItem'
import { Table } from 'reactstrap';

class BudgetList extends React.Component {
    
    budgetList = () => {
        return this.props.budgets.map(budget => <BudgetItem key={budget.id} budgetObj={budget} />)
    }
    
    render() {
      console.log(this.props)
        return(
            <>
            <Table>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
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

export default BudgetList