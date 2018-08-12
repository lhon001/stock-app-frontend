import React, { Component } from 'react';
import { createUser } from '../adapter';
import { connect } from 'react-redux';

class SignUpForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value
    }
    createUser(newUser)
    this.props.userPage(newUser)
  }

  render(){
    return (
      <div>
        <h2 className="App">Create New Account</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <br></br>

          <label>Name</label>
          <input type="text" name='name'></input>
          <br></br>

          <label>Username</label>
          <input type="text" name="username"></input>
          <br></br>

          <label>Password</label>
          <input type="text" name="password"></input>
          <br></br>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return{
    userPage: (newUser) => dispatch({type: "SHOW_USER_PAGE", payload: {currentUser: newUser, content: 'userPage'}})
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm)
