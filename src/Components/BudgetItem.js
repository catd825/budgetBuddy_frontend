import React from 'react';
import { Button } from 'reactstrap';
import { withRouter} from 'react-router-dom'
import EditModalForm from './EditModalForm.js'

class BudgetItem extends React.Component {
    
  routeChange=()=> {
    let budgetId = this.props.budgetObj.id
    let path = `/budgets/${budgetId}/edit`;
    this.props.history.push(path)
  }

  deleteHelper = ()=>{
    return this.props.deleteHelper(this.props.budgetObj)
  }


  chooseMonth=() => {
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = this.props.budgetObj.month - 1 
    let monthName = months[d]
    return monthName
}
  
  render() {
        return(
            <tbody>
            <tr>
              <th scope="row"></th>
              <td>{this.chooseMonth()}</td>
              <td>{this.props.budgetObj.category_name}</td>
              <td>${this.props.budgetObj.amount}</td>
              <td><EditModalForm editHandler={this.props.editHandler} budgets={this.props.budgetObj} parentComponent="budgetList" buttonLabel="Edit"/></td>
              {/* <td><Button onClick={this.routeChange}>Edit</Button></td> */}
              <td><Button color="danger" onClick={this.deleteHelper} >Delete</Button></td>
            </tr>
          </tbody> 
        )
    }


}


export default withRouter(BudgetItem)