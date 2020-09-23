import React from 'react'
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class TransactionEdit extends React.Component {
    
    state={
        
        id: this.props.transObj.id || 0,
        category_id: this.props.transObj.category_id || 0,
        bank_account_id: this.props.transObj.bank_account_id || 0,
        date: this.props.transObj.date || '',
        amount: this.props.transObj.amount || 0,
        trans_type: this.props.transObj.trans_type || '',
        description: this.props.transObj.description || '',
        category_name: this.props.transObj.category_name || '',
        month: this.props.transObj.month || 0
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
                // return category_name = category.name
                return <option>{category_name = category.name}</option>
            }) 
        } 
    }

    
    render() {
        console.log(this.props)
        return(
            <>
            <Form onSubmit={this.editHelper}>
            <p>Date: {this.props.transObj.date}</p>
            <p>Description: {this.props.transObj.description}</p>

            <FormGroup>
                <Label for="exampleCustomSelect">Select Budget Month</Label>
                <CustomInput name="category_name" type="select" onChange={this.changeHelper}>
                <option>Select Category</option>
                        {this.mapCategories()}
                </CustomInput>
            </FormGroup>

            <p>Amount: ${this.props.transObj.amount}</p>

            <Input type="submit"></Input>

            </Form>
            
            </>
        )
    }
}


export default TransactionEdit