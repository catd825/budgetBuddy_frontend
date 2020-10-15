import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';


class TransCreate extends React.Component {
    state = {
        user_id: this.props.currentUser.id,
        category_id: "",
        bank_account_id: "",
        amount: 0,
        category_name: "",
        description: "",
        user_name: this.props.currentUser.name,
        trans_type: "",
        date: "",
        month: 0
    }


    submitHelper = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    changeHelper =(e) => {
        // console.log(e.target.value)
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
        // console.log(this.props)

        return(
            <>
            {this.props.transactions === null ? "" : 
            <>
                <Form onSubmit={this.submitHelper}>
                    
                <FormGroup>
                    <Label for="category_name">Select</Label>
                        <Input type="select" name="category_name" onChange={this.changeHelper} value={this.state.category_name}>
                        <option>Select Category</option>
                        {this.mapCategories()}
                        </Input>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">How much was the expense?</Label>
                    <Input onChange={this.changeHelper} type="number" name="amount" value={this.state.amount} />
                </FormGroup>


                <FormGroup>
                    <Label for="exampleSelect">Select Income or Expense</Label>
                    <Input type="select" name="trans_type" id="exampleSelect" onChange={this.changeHelper} value={this.state.trans_type} >
                    <option>Select</option>
                    <option>Expense</option>
                    <option>Income</option>
                    </Input>
                </FormGroup>
                
                <FormGroup>
                    <Label for="exampleSearch">Description</Label>
                    <Input
                    type="search"
                    name="description"
                    id="exampleDescription"
                    placeholder="add description"
                    value={this.state.description}
                    onChange={this.changeHelper}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                    value={this.state.date}
                    onChange={this.changeHelper}
                    />
                </FormGroup>

                    <Input type="submit"></Input>
                </Form>
            </>
        }
        </>
        )
    }


}




export default TransCreate