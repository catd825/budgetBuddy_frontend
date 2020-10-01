import React from 'react';

class TransactionCategory extends React.Component {

    render() {

        return (
            <li>
            
            {this.props.transObj.category_name}

            </li>
        )
    }
}


export default TransactionCategory;