import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';


class Login extends React.Component {

    state = {
        username: "",
        password: "",
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
        
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render () {
        return (
            <>
                
                <br/><br/><br/>
                <h2>budgetBuddy</h2>
                <br/><br/>
                
                <div className="center">
                    
                        <Form onSubmit={event => this.submitHandler(event)} id="signup" style={{ width: "300px" }}>

                            <FormGroup>
                                <Label for="username" className="mr-sm-2">Username</Label>
                                <Input style={{ width: "300px" }} type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" className="mr-sm-2">Password</Label>
                                <Input style={{ width: "300px" }} type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                            </FormGroup>
                            
                            <Button type="submit" value="Login">Submit</Button><br/><br/>

                        </Form>
                    </div>
                    
                    <NavLink style={{ color: "black" }} tag={Link} to="/signup">New here? Sign up!</NavLink>
                
            </>
        )
    }
}

export default Login
