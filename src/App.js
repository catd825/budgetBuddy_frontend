import React from 'react';
import './App.css';
import { Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import SummaryContainer from './Containers/SummaryContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'
// import TransactionContainer from './Containers/TransactionContainer'
// import BudgetContainer from './Containers/BudgetContainer'
// import Link from './Components/Link';

class App extends React.Component {
  
  state = {
    user: false
  }
  

  signUpHandler = (userObj) => {
    const configObj = {
      method: "POST",
      headers: {
        "accepts" : "application/json",
        "content-type" : "application/json"
      },
      body: JSON.stringify({user: userObj})
    }

    fetch("http://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => this.setState({
        user: data.user
        })
      )
  }
  

loginHandler = (userInfo) => {
  console.log("logging in", userInfo)
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    'body': JSON.stringify({user: userInfo})
  }

  fetch("http://localhost:3000/api/v1/login", configObj)
  .then(response => response.json())
  .then(data => {
    // console.log("token", data.jwt)
    localStorage.setItem("token", data.jwt)
    this.setState({user: data.user}, () => this.props.history.push("/"))
  }
  )

}

getToken = () => {
  return localStorage.getItem("token")
}

componentDidMount(){
  const token = this.getToken()
  if (token) {
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => response.json())
    .then(data => this.setState({user: data.user}))
  } else {
    this.props.history.push("/signup")
  }

}

logOutHandler = () => {
  localStorage.removeItem("token")
  this.props.history.push("/login") 
  this.setState({user:false})
}

  
  render() {
    
  return (
    <>
      <Navbar currentUser={this.state.user} />
      <Switch>
        <Route path="/Login" render={(routerProps) => <Login clickHandler={this.logOutHandler} submitHandler={this.loginHandler} user={this.state.user} />}/> 
        <Route path="/signup" render={(routerProps) => <Signup submitHandler={this.signUpHandler} />}/>
        <Route path="/" render={(routerProps) => <SummaryContainer user={this.state.user} getToken={this.getToken}/>}/>
        {/* <Route path="/transactions" render={(routerProps) => <TransactionContainer/>} />
        <Route path="/budgets" render={(routerProps) => <BudgetContainer/>} /> */}
      </Switch>
    </>
  );
}
}

export default withRouter(App);
