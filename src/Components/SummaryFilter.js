import React from 'react'
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';

class SummaryFilter extends React.Component {
    render() {
        return(
            <>
            <Form>
                <FormGroup>
                <Label for="exampleCustomSelect">View Summary by Month</Label>
                <br/>
                <CustomInput type="select" onChange={this.props.changeHandler}>
                    <option value="">Select</option>
                    <option value="0">All</option>
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
          </Form>
          </>

        )
    }
}

export default SummaryFilter