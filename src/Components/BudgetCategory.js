import React from 'react';

class BudgetCategory extends React.Component {

    render() {
        console.log("budgetObj", this.props.budgetObj)
        console.log("transObj", this.props.transObj)
        return (
            <li>
            budget summary
            {/* {this.props.budgetObj.category_name}
            {this.props.budgetObj.amount} */}
            </li>
        )
    }
}


export default BudgetCategory;