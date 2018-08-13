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
      .then(createdUser => {
        console.log(createdUser);
        this.props.userPage(createdUser)
        localStorage.setItem('currentUser', createdUser.id)
      })
  }

  render(){
    return (
      <div className="row">
        <h4>Sign Up</h4>
         <form className="col s12" onSubmit={(e) => this.handleSubmit(e)}>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Name" id="name" type="text" name="name"/>
               {/* <label for="name">Name</label> */}
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Username" id="username" type="text" name="username"/>
               {/* <label for="username">Username</label> */}
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Password" id="password" type="password" name="password"/>
               {/* <label for="password">Password</label> */}
             </div>
           </div>
           <div>
             <button className="btn-small waves-effect waves-light material-icons right" type="submit">Sign Up</button>
           </div>
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
