import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchInput from './components/SearchInput'
import StockDisplay from './components/StockDisplay'
import { getStockInfo } from './adapter'

class App extends Component {


  findStock = () => {

  }

  render() {
    return (
      <div>
        <SearchInput className='form' findStock={this.findStock} />
        <StockDisplay />
      </div>
    );
  }
}

export default App;
