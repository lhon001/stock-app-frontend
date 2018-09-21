import React from 'react'
import { connect } from 'react-redux'
import UserPortfolioTabs from './UserPortfolioTabs'
import PortfolioStocksInfo from './PortfolioStocksInfo'
import PortfolioGraphs from './PortfolioGraphs'
import { getPortfolioStocks, getPortfolios, getStockInfo } from '../adapter'

class UserPageDisplay extends React.Component {

  handleTabSelect = (portfolioID) => {
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
          this.props.currentStockInfo({...stockInfo, id:stock.id})
        })
      })}
    })
    .then(() => {
      let dayArray = []
      let priceArray = []
      this.props.currentStocks.forEach((stock) => {
        getStockInfo(stock.symbol)
        .then(stockInfo => {
          let stockPriceArray = []
          stockInfo.chart.forEach((element) => {
            stockPriceArray.push(element.close)
            dayArray.push(element.date)
          })
          // console.log("stockPriceArray: ", stockPriceArray);
          priceArray.push(stockPriceArray)
          // console.log("priceArray: ", priceArray);
          this.props.setPortfolioGraphsPrices(priceArray)
          this.props.setPortfolioGraphsDates(dayArray)
        })
      })
    })

  }

  render(){
    return(
      <React.Fragment>
        {/* {this.props.currentID ? <PortfolioGraphs /> : null} */}
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
    currentID: state.currentPortfolioID,
    stockInfo: state.currentStockInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
    currentPortfolioID: (portfolioID) => dispatch({type: 'CURRENT_PORTFOLIO_ID', payload: {currentPortfolioID: portfolioID}}),
    currentStockInfo: (tempArray) => dispatch({type: 'STOCK_INFO', payload: {currentStockInfo: tempArray}}),
    resetStockInfo: () => dispatch({type: 'RESET_STOCK_INFO_ARRAY'}),
    setPortfolioGraphsPrices: (prices) => dispatch({type:"SET_PORTFOLIO_GRAPH_PRICES", payload: {portfolioGraphsPrices: prices}}),
    setPortfolioGraphsDates: (dates) => dispatch({type:"SET_PORTFOLIO_GRAPH_DATES", payload: {portfolioGraphsDates: dates}}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageDisplay)
