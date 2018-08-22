import React from 'react'
import { connect } from 'react-redux'
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import { getPortfolioStocks, getPortfolios, getStockInfo } from '../adapter'

class UserPageDisplay extends React.Component {
  
  handleTabSelect = (portfolioID) => {
    // this.setState({
    //   currentPortfolioID: portfolioID
    // })
    this.props.currentPortfolioID(portfolioID)

    getPortfolioStocks(portfolioID) // why does this.state.currentPortfolioID vs portfolioID not work
    .then(stocks => {
      // this.setState({currentPortfolioStocks: stocks})
      this.props.currentPortfolioStocks(stocks)
    })
    .then(() => {
      let tempArray = []

      if (this.props.currentStocks.length > 0){
      this.props.currentStocks.forEach((stock) => {
        getStockInfo(stock.symbol)
        .then(stockInfo => {
          tempArray.push({...stockInfo, id:stock.id})
        })
        .then(() => {
          this.props.currentStockInfo(tempArray)
        })
      })}
      else {
        this.props.currentStockInfo([])
      }
    })

  }

  render(){
    console.log("current Portfolio ID: ", this.props.currentID);
    console.log("current portfolio stocks: ", this.props.currentStocks);
    console.log("current user: ", this.props.currentUser);
    return(
      <React.Fragment>
        <UserPortfolioTabs currentUser={this.props.currentUser} handleTabSelect={this.handleTabSelect}/>
        <PortfolioStocksInfo />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentStocks: state.currentPortfolioStocks,
    currentID: state.currentPortfolioID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
    currentPortfolioID: (portfolioID) => dispatch({type: 'CURRENT_PORTFOLIO_ID', payload: {currentPortfolioID: portfolioID}}),
    currentStockInfo: (stockInfo) => dispatch({type: 'STOCK_INFO', payload: {currentStockInfo: stockInfo}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageDisplay)
