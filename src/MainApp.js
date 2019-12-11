import React from 'react';
import './App.css';
import Nav from './Nav.jsx'
import axios from 'axios';
import CardPage from './cardPage.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const accountRoot = new axios.create({
  baseURL: "http://localhost:3000/account"
});

export class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true,
      name: "",
      person:[],
      login: '',
      password: "",
      start: 0,
      newAccount: false
    };

  }
  componentDidMount = () => {
  
     
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  handleChangeLogin = event => {
    this.setState({ login: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }
  
  handleSubmitLogin = event => {
    event.preventDefault();

    accountRoot.post('/login', {
      "name": this.state.login,
      "pass": this.state.password
    })
      .then(res => {
        if(res.status === 200){
          alert("Succesfully Logged In!");
          this.setState({
            start: 200,
            guest: false
          })
        } 
        console.log(res);
        console.log(res.data);
       
      })
      .catch(err => {if(err.status !== 200) { console.log("FAIL!"); alert("Wrong Username or Password");}});

      
      // alert("Username or Password Not Recognized");
      
  }
  handleCreateNew = event => {
    event.preventDefault();

    accountRoot.post('/create', {
      "name": this.state.login,
      "pass": this.state.password,
      "data": {
        "role": 2,
        "description": "New User"
      }
    })
      .then(res => {
        alert("Account created Succesfully");
        this.setState({newAccount: false});
        console.log(res);
        console.log(res.data);
      })
      
  }
  handleSubmit = event => {
    event.preventDefault();

    const data = {
       "authors":{"first": this.state.name}
    };

    pubRoot.post('/examplePost', { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      
  }
  handleContinueAsGuest = event => {
    
    this.setState({
      start: 200
    })
    // this.renderPage();
  }

  handleLogOut = event => {
    // alert("yo");
    this.setState({newAccount: false});
  }

  handleSubmit2 = event => {
    event.preventDefault();

    const data = {
       "authors":{"first": this.state.name}
    };

    pubRoot.get('/examplePost/authors', { data })
      .then(res => {
        console.log(res.data);
        if(res.data.result.first === this.state.name){
          this.setState({login: "200"})
        }
      
      })
  }
  changeNewAccountState = () =>{

    this.setState({newAccount: true});

  }

  renderRegistration(){
    return (
         <div className="register">
         <h className = "regHead">New User Registration</h>
         <br></br>
         <a className = "return"  onClick ={this.handleLogOut}>Return to Login</a>
      <form onSubmit={this.handleCreateNew}>
      <label>
      <strong>Username:</strong> <br></br>
        <input type="text" name="Login" onChange={this.handleChangeLogin} />
      </label>
      <label>
      <strong>Password:</strong>
        <input type="text" name="Password" onChange={this.handleChangePassword} />
      </label>
      <button type="submit">Create New User</button>
    </form>
    </div>
    )
  }
  renderLogin(){
    
    return (
      <div className = "start">
        
        <main>
        <div className = "card-body">
        <form onSubmit={this.handleSubmitLogin}>
          <label>
            <strong>Username:</strong> <br></br>
            <input type="text" name="Login" onChange={this.handleChangeLogin} />
          </label>
          
          <label>
          <strong>Password:</strong>
            <input type="text" name="Password" onChange={this.handleChangePassword} />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>Continue as Guest? Click <a href="#" onClick={this.handleContinueAsGuest}>Here</a></p>
        <br></br>
        <p>Or <a href="#" onClick={this.changeNewAccountState}>Create A New Account</a></p>


      </div>
        </main>
      </div>
    );

  }
  renderStart(){
    
    return (
      <div className = "start">

         <div>
        {this.state.newAccount === false
          ? this.renderLogin()
          : this.renderRegistration()}
      </div>

      </div>
    );

  }

  renderPage() {
    return (
      <div>
          <Nav className = "nav"/>
       <main>
       <CardPage guest = {this.state.guest}/>
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
        <form onSubmit={this.handleSubmit2}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
          <h1>{this.state.person}</h1> */}
        </main>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.state.start ===0
          ? this.renderStart()
          : this.renderPage()}
      </div>
    )

    // this.on('click', '.log-out', handleLogOut);
  }
  
}

export default MainApp;
