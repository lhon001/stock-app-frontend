import React, { Component } from 'react';
import { loginUser } from '../adapter';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    loginUser(user)
      // .then(console.log(this.props))
      .then(loggedInUser => this.props.userPage(loggedInUser))
  }

  render(){
    return (
      <div>
        <h2 className="App">Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
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
    userPage: (user) => dispatch({type: "SHOW_USER_PAGE", payload: {currentUser: user, content: 'userPage'}})
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
