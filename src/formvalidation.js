import React from "react";
import styled from 'styled-components'


const Error = styled.div`
color:red;
`
const Button = styled.button`
background: linear-gradient(to right,pink,white);
border-radius:50%;
border:none;
box-shadow:0 0 5px red;
outline:none
`
const initialState = {
  name: "",
  email: "",
  password: "",
  nameerror: "",
  emailerror: "",
  passworderror: "",
  isFocus:false
};      

class FormValidation extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.textInput = React.createRef();
    
  }

  validate = () => {

    let nameerror = "";

    let emailerror = "";
    
    let passworderror = "";

    if (!this.state.email.includes("@")) {
      emailerror = "invalid email";
    }

    if (this.state.name.length === 0) {
      nameerror = "name cannot be blank";
    }

    if (this.state.password.length === 0 || this.state.password.length > 16) {
      passworderror = "password cannot be blank or longer than 16";
    }

    if (emailerror || nameerror || passworderror) {
      this.setState({ emailerror, nameerror, passworderror });
      return false;
    }
    return true;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let valid = this.validate();
    if (valid) {
      console.log(this.state);
      this.setState(initialState);
    }
  };
componentDidMount(){

  this.textInput.current.focus()

}

handleFocus=()=>{
  this.setState((prevState)=>
    ({isFocus:!prevState.isFocus})
  )
  console.log(this.state.isFocus)
}
  render() {
    return (
      <form>
        <label htmlFor='nameInput'>name:</label>
        <input
          ref={this.textInput}
          onChange={this.handleChange}
          style={{ display: "block" }}
          name="name"
          value={this.state.name}
          id='nameInput'
          placeholder="name"
        />
        <Error>{this.state.nameerror}</Error>

        <label >E-mail:
        <input
          style={this.state.isFocus?{backgroundColor:'yellow',display:'block'}:{backgroundColor:'white',display:'block'}}
          onFocus={this.handleFocus}
          onBlur={this.handleFocus}
          onChange={this.handleChange}
          
          name="email"
          value={this.state.email}
          placeholder="email"
        />
        </label>
        <Error>{this.state.emailerror}</Error>

        <label htmlFor='passwordInput'>password:</label>
        <input
          onChange={this.handleChange}
          style={{ display: "block" }}
          name="password"
          type="password"
          id='passwordInput'
          value={this.state.password}
          placeholder="password"
        />
        <Error>{this.state.passworderror}</Error>

        <Button type="submit" onClick={this.handleSubmit}>
          submit
        </Button>
      </form>
    );
  }
}
export default FormValidation;


