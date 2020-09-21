import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';


class BudgetCreate extends React.Component {
    state = {
        user_id: this.props.users[0].id,
        category_id: "",
        amount: 0,
        date: "",
        category_name: "",
        user_name: this.props.users[0].name
    }


    submitHelper = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    changeHelper =(e) => {
        // console.log(e.target)
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
            {this.props.budgets === null ? "" : 
            <>
                <h2>Create New Budgets</h2>
                <Form onSubmit={this.submitHelper}>
                    
                <FormGroup>
                    <Label for="category_name">Select</Label>
                        <Input type="select" name="category_name" onChange={this.changeHelper} value={this.state.category_name}>
                        {this.mapCategories()}
                        </Input>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">How much would you like to budget?</Label>
                    <Input onChange={this.changeHelper} type="number" name="amount" value={this.state.amount} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input
                    onChange={this.changeHelper}
                    value={this.state.date}
                    type="date"
                    name="date"
                    placeholder="date placeholder"
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




export default BudgetCreate