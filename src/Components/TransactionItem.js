import React from 'react';
import { Button } from 'reactstrap';
import { withRouter} from 'react-router-dom'
import TransEditModalForm from './TransEditModalForm'
class TransactionItem extends React.Component {
    
  
  routeChange=()=> {
    let transId = this.props.transactions.id
    let path = `/transactions/${transId}/edit`;
    this.props.history.push(path)
  }
  
  
  render() {

    console.log(this.props)
        return(

            <tbody>
            <tr>
              <th scope="row"></th>
              <td>{this.props.transactions.date}</td>
              <td>{this.props.transactions.category_name}</td>
              <td>{this.props.transactions.description}</td>
              <td>{this.props.transactions.amount}</td>
              <td><TransEditModalForm editHandler={this.props.editHandler} categories={this.props.categories} transactions={this.props.transactions} parentComponent="transList" buttonLabel="Edit"/></td>
              {/* <td><Button onClick={this.routeChange}>Edit</Button></td> */}
            </tr>
          </tbody> 
        )
    }
}

export default withRouter(TransactionItem)