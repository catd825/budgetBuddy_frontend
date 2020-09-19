import React from 'react';

class TransactionItem extends React.Component {
    render() {
        return(

            <tbody>
            <tr>
              <th scope="row"></th>
              <td>{this.props.transObj.date}</td>
              <td>{this.props.transObj.category_name}</td>
              <td>{this.props.transObj.description}</td>
              <td>{this.props.transObj.amount}</td>
            </tr>
          </tbody> 
        )
    }
}

export default TransactionItem