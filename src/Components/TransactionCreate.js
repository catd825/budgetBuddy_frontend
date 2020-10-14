import React from 'react'
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';


class TransactionCreate extends React.Component {
    state = {
        bank_account_id: 1,
        category_id: "",
        amount: 0,
        category_name: "",
        description: "",
        trans_type: "",
        month: 0
    }


    submitHelper = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    changeHelper =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    //maps out all categories 
    mapCategories = () => {
        if (this.props.categories){
            return this.props.categories.map(category => {
                return <option>{category.name}</option>
            }) 
        } 
    }

    

    render() {
        console.log(this.props.bank_accounts)

        return(
            <>
            {this.props.budgets === null ? "" : 
            <>
                <h2>Create New Transaction</h2>
                <Form onSubmit={this.submitHelper}>
                    
                <FormGroup>
                <Label for="exampleCustomSelect">Select Budget Month</Label>
                <CustomInput name="month" type="select" onChange={this.changeHelper}>
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
            </FormGroup>
            
                <FormGroup>
                    <Label for="category_name">Select</Label>
                        <Input type="select" name="category_name" onChange={this.changeHelper} value={this.state.category_name}>
                        <option>Select Category</option>
                        {this.mapCategories()}
                        </Input>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">How much did you spend?</Label>
                    <Input onChange={this.changeHelper} type="number" name="amount" value={this.state.amount} />
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">Please give a brief description of the cost</Label>
                    <Input onChange={this.changeHelper} type="text" name="description" value={this.state.description} />
                </FormGroup>

                    <Input type="submit"></Input>
                </Form>
            </>
        }
        </>
        )
    }


}




export default TransactionCreate