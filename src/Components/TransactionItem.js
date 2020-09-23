import React from 'react';
import { Button } from 'reactstrap';
import { withRouter} from 'react-router-dom'

class TransactionItem extends React.Component {
    
  
  routeChange=()=> {
    let transId = this.props.transObj.id
    let path = `/transactions/${transId}/edit`;
    this.props.history.push(path)
  }
  
  
  render() {
        return(

            <tbody>
            <tr>
              <th scope="row"></th>
              <td>{this.props.transObj.date}</td>
              <td>{this.props.transObj.category_name}</td>
              <td>{this.props.transObj.description}</td>
              <td>{this.props.transObj.amount}</td>
              <td><Button onClick={this.routeChange}>Edit</Button></td>
            </tr>
          </tbody> 
        )
    }
}

export default withRouter(TransactionItem)