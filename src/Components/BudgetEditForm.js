import React from 'react';
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';


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

                {/* <FormGroup>
                <Label for="exampleCustomSelect">Select Budget Month</Label>
                <CustomInput name="month" type="select" value={this.state.month} onChange={this.changeHelper}>
                    <option value="">Select</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </CustomInput>
            </FormGroup> */}

                    <Input type="submit"></Input>
                </Form>
            </>
        }
        </>
        )
    }



}


export default BudgetEditForm
