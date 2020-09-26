import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';


class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        name: ""
    }

    // resetForm = () => {
    //     this.setState({
    //         username: "",
    //         password: "",
    //         birthdate: "",
    //         gender: "",
    //         gender_other: false,
    //         location: ""
    //     })
    // }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
        
    }


    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
        // this.resetForm()
    }

    // renderErrors = () => {
    //     return (
    //         this.props.signupError.map((error,index) =>
    //             {
    //                 return (
    //                     <p style={{color:"red"}} key={index}>{error}</p>
    //                 )
    //             }
    //         )
    //     )
    // }

    render () {
        return (
            <>
                {/* {this.props.user === false ? */}
                <>
                <br/><br/><br/><br/><br/>
                    <div className="formCenter">
                    
                        <Form onSubmit={event => this.submitHandler(event)} id="signup" style={{ width: "300px" }}>
                            
                            <FormGroup>
                                <Label for="name" className="mr-sm-2">Name</Label>
                                <Input style={{ width: "300px" }} type="name" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler} />
                            </FormGroup>               

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
                    <NavLink style={{ color: "black" }} tag={Link} to="/login">Returning User? Log In!</NavLink>
                </>
                {/* // :
                // <>
                //     <div className="center">
                //         <h1>Please logout before signing up!</h1>
                //     </div> 
                //     <button type="button" onClick={this.props.clickHandler}>Logout</button>
                // </>
                // } */}
                
            </>
        )
    }
}

export default Signup
