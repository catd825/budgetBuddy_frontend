import React from 'react';

class BudgetItem extends React.Component {
    render() {
        console.log(this.props)
        return(
            <tbody>
            <tr>
              <th scope="row"></th>
              <td>{this.props.budgetObj.date}</td>
              <td>{this.props.budgetObj.category_name}</td>
              <td>{this.props.budgetObj.amount}</td>
              <td>add edit button here</td>
              <td>add delete button here</td>
            </tr>
          </tbody> 
        )
    }


}


export default BudgetItem