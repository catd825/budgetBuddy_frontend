import React from 'react';

class TransactionCategory extends React.Component {

    render() {
        // console.log("transaction category", this.props)

        return (
            <li>
            
            {this.props.transObj.category_name}

            </li>
        )
    }
}


export default TransactionCategory;