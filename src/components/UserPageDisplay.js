import React from 'react'
import { connect } from 'react-redux'
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import { getPortfolioStocks, getPortfolios, getStockInfo } from '../adapter'

class UserPageDisplay extends React.Component {
  state = {
    currentPortfolioID: null,
    currentPortfolioStocks: null,
    stockInfoArray: []
  }

  handleTabSelect = (portfolioID) => {
    this.setState({
      currentPortfolioID: portfolioID
    })

    getPortfolioStocks(portfolioID) // why does this.state.currentPortfolioID vs portfolioID not work
    .then(stocks => {
      this.setState({currentPortfolioStocks: stocks})
    })
    .then(() => {
      let tempArray = []
      if (this.state.currentPortfolioStocks.length > 0){
      this.state.currentPortfolioStocks.forEach((stock) => {
        getStockInfo(stock.symbol)
        .then(stockInfo => {
          tempArray.push({...stockInfo, id:stock.id})
        })
        .then(() => {
          this.setState({
            stockInfoArray: tempArray
          })
        })
      })}
      else {
        this.setState({stockInfoArray: []})
      }
    })

  }

  render(){
    console.log("current Portfolio ID: ", this.state.currentPortfolioID);
    return(
      <React.Fragment>
        <UserPortfolioTabs currentUser={this.props.currentUser} handleTabSelect={this.handleTabSelect}/>
        <PortfolioStocksInfo stockInfoArray={this.state.stockInfoArray} portfolioID={this.state.currentPortfolioID}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageDisplay)
