import React from 'react'
import { connect } from 'react-redux'
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import { getPortfolioStocks, getPortfolios, getStockInfo } from '../adapter'

class UserPageDisplay extends React.Component {

  handleTabSelect = (portfolioID) => {
    let tempArray = []
    this.props.currentPortfolioID(portfolioID)
    this.props.resetStockInfo([])

    getPortfolioStocks(portfolioID)
    .then(stocks => {
      this.props.currentPortfolioStocks(stocks)
    })
    .then(() => {
      if (this.props.currentStocks.length > 0){
      this.props.currentStocks.forEach((stock) => {
        getStockInfo(stock.symbol)
        .then(stockInfo => {
          // tempArray.push({...stockInfo, id:stock.id})
          console.log(stockInfo);
          this.props.currentStockInfo({...stockInfo, id:stock.id})
        })
        // .then(() => {
        //   console.log("this is tempArray", tempArray);
        //   this.props.currentStockInfo(tempArray)
        //   // console.log(this.props.stockInfo);
        //   // console.log(this.props.currentStocks);
        // })
      })}
    })


  }

  render(){
    // console.log("current Portfolio ID: ", this.props.currentID);
    // console.log("current portfolio stocks: ", this.props.currentStocks);
    // console.log("current stockInfo: ", this.props.stockInfo);
    return(
      <React.Fragment>
        <UserPortfolioTabs currentUser={this.props.currentUser} handleTabSelect={this.handleTabSelect}/>
        {/* {this.props.currentStockInfo ? <PortfolioStocksInfo /> : null} */}
        <PortfolioStocksInfo />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentStocks: state.currentPortfolioStocks,
    currentID: state.currentPortfolioID,
    stockInfo: state.currentStockInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
    currentPortfolioID: (portfolioID) => dispatch({type: 'CURRENT_PORTFOLIO_ID', payload: {currentPortfolioID: portfolioID}}),
    currentStockInfo: (tempArray) => dispatch({type: 'STOCK_INFO', payload: {currentStockInfo: tempArray}}),
    resetStockInfo: () => dispatch({type: 'RESET_STOCK_INFO_ARRAY'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageDisplay)
