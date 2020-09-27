import React from 'react'
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';


class BudgetCreate extends React.Component {
    state = {
        user_id: this.props.currentUser.id,
        category_id: "",
        amount: 0,
        category_name: "",
        user_name: this.props.currentUser.name,
        trans_type: "Expense",
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

//shows currently used categories for current Month
    currentUserCategories = () => {
        if(this.props.budgets) {
            return this.props.budgets.map(budget => {
                if(budget.amount !== 0 && budget.month === parseInt(this.state.month)){
                return budget.category_name
                }
                // debugger
            })                   
        }
    }


    //maps out all categories 
    mapCategories = () => {
        if (this.props.categories){
            return this.props.categories.map(category => {
                return category.name
            }) 
        } 
    }

//allows user to only select categories not currently used
    showCategories = () => {
        let current = this.currentUserCategories(); //all categories the user has assigned for current month
        let all = this.mapCategories(); //all categories in database for month
        let revised = new Set(current); //create new set
        console.log(revised)
        let unused = [...new Set([...all].filter(x => !revised.has(x)))] //filter out categories that havent been assigned
        
        //map into array into selection dropdown
        return unused.map(category => {
            console.log(category)
            return <option>{category}</option>
        })
    }
    

    render() {
        console.log(this.state)

        return(
            <>
            {this.props.budgets === null ? "" : 
            <>
                <h2>Create New Category Budget</h2>
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
                        {this.showCategories()}
                        </Input>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="amount">How much would you like to budget?</Label>
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




export default BudgetCreate