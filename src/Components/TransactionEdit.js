import React from 'react'
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class TransactionEdit extends React.Component {
    
    state={
        
        id: this.props.transactions.id || 0,
        user_id: this.props.transactions.user_id || 0,
        category_id: this.props.transactions.category_id || 0,
        bank_account_id: this.props.transactions.bank_account_id || 0,
        date: this.props.transactions.date || '',
        amount: this.props.transactions.amount || 0,
        trans_type: this.props.transactions.trans_type || '',
        description: this.props.transactions.description || '',
        category_name: this.props.transactions.category_name || '',
        month: this.props.transactions.month || 0

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


    mapCategories = () => {
        if (this.props.categories){
            let category_name = ""
            return this.props.categories.map(category => {
                return <option>{category_name = category.name}</option>
            }) 
        } 
    }

    
    render() {
        return(
            <>
            <br/>
            <h2>Edit Transaction Category</h2>
            <Form onSubmit={this.editHelper}>
            <p>Date: {this.props.transactions.date}</p>
            <p>Description: {this.props.transactions.description}</p>

            <FormGroup>
                <Label for="exampleCustomSelect"></Label>
                <br/>
                <CustomInput style={{ width: "300px" }} name="category_name" type="select" onChange={this.changeHelper}>
                <option>Select Category</option>
                        {this.mapCategories()}
                </CustomInput>
            </FormGroup>

            <p>Amount: ${this.props.transactions.amount}</p>

            <Input type="submit"></Input>

            </Form>
            
            </>
        )
    }
}


export default TransactionEdit