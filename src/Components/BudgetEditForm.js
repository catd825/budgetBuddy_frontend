import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


class BudgetEditForm extends React.Component {
    state = {
        id: this.props.budgets.id || "",
        user_id: this.props.budgets.user_id || "",
        category_id: this.props.budgets.category_id || "",
        amount: this.props.budgets.amount || 0,
        month: this.props.budgets.month || "",
        category_name: this.props.budgets.category_name || "",
        user_name: this.props.budgets.user_name || ""
    }


    editHelper = (e) => {
        e.preventDefault()
        this.props.editHandler(this.state)

    }

    changeHelper =(e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return(
            <>
            {this.props.budgets === null ? "" : 
            <>
                <h2>Edit Budget</h2>
                <Form onSubmit={this.editHelper}>
                    
                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">{this.props.budgets.category_name}</Label>
                    <Input onChange={this.changeHelper} type="number" name="amount" value={this.state.amount} />
                </FormGroup>

                    <Input type="submit"></Input>
                </Form>
            </>
        }
        </>
        )
    }



}


export default BudgetEditForm
