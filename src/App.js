import React, { Component } from 'react';
import logo from './logo.svg';
import './materialize/css/materialize.css';
import Display from './components/Display'
import UserSignUp from './components/UserSignUp'
import UserLogin from './components/UserLogin'
import UserLogout from './components/UserLogout'
import SearchInput from './components/SearchInput'
import UserHome from './components/UserHome'
import { getStockInfo, createUser, getUser } from './adapter'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount = () => {
    if (localStorage.getItem('currentUser')){
      getUser(localStorage.getItem('currentUser'))
        .then(userObj => this.props.refresh(userObj))
    }
  }

  render() {
    return (
      <div className="container">
        <nav>
          <div className=" nav-wrapper">
            {/* <a className="brand-logo">StockR</a> */}
            <ul className="right">
              <li>{this.props.currentUser ? <UserLogout /> : null}</li>
              <li>{this.props.currentUser ? null : <UserSignUp />}</li>
              <li>{this.props.currentUser ? null : <UserLogin />}</li>
              <li>{this.props.currentUser ? <UserHome /> : null}</li>
            </ul>
          </div>
        </nav>
        <SearchInput className='form'/>
        <Display />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content,
    stock: state.stock,
    signUpState: state.signUpState,
    loginState: state.loginState,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: (currentUser) => dispatch({type: 'SHOW_USER_PAGE', payload: {currentUser: currentUser, content: 'userPage'}})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


// localStorage.setItem('token', userData.id)
// localStorage.removeItem("token")
// localStorage.getItem('token')
