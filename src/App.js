import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './components/Display'
import UserSignUp from './components/UserSignUp'
import UserLogin from './components/UserLogin'
import SearchInput from './components/SearchInput'
import { getStockInfo, createUser } from './adapter'

class App extends Component {
  // state = {
  //   display: 'home',
  // }

  render() {
    return (
      <div>
        <UserSignUp />
        <UserLogin />
        <SearchInput className='form'/>
        <Display />
      </div>
    );
  }
}

export default App;
