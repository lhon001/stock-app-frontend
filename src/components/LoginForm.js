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

    if (!user.username || !user.password){
      alert("Must enter a valid Username and Password")
    } else {
      if (loginUser(user)){
        loginUser(user).then(resp => {
          if (resp.error !== "login failed"){
            loginUser(user)
              .then(loggedInUser => {
                this.props.userPage(loggedInUser)
                localStorage.setItem('currentUser', loggedInUser.id)
              })
          } else {
            alert("Account not found, please try logging in again")
          }
        })
      }
    }
  }

  render(){
    return (
      <div className="row">
        <h4>Login</h4>
         <form className="col s12" onSubmit={this.handleSubmit}>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Username" id="username" type="text" />
               {/* <label for="username">Username</label> */}
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Password" id="password" type="password" name='password'/>
               {/* <label for="password">Password</label> */}
             </div>
           </div>
           <button className="btn-small waves-effect waves-light material-icons right">Login</button>
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
