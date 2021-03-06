import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks, deletePortfolio } from '../adapter'

class StockInfoHeader extends React.Component {

  handleClick = () => {
    this.props.currentPortfolio(this.props.currentID)
    deletePortfolio(this.props.currentID)
    this.props.currentPortfolioStocks(this.props.currentStocksInfo)
  }

  render(){
    return(
      <React.Fragment>
        <tr>
          <th><button onClick={this.handleClick}>X</button></th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>52 Week High</th>
          <th>52 Week Low</th>
          <th>Price-To-Book</th>
          <th>Price-To-Sales</th>
          <th>Latest EPS</th>
          <th>Beta</th>
          <th>Return on Equity</th>
          <th>P/E Ratio</th>
        </tr>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentID: state.currentPortfolioID,
    currentStocks: state.currentPortfolioStocks,
    currentStockInfo: state.currentStockInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolio: (portfolioID) => dispatch({type: 'DELETE_PORTFOLIO', payload: {portfolioID: portfolioID}}),
    currentPortfolioStocks: (stocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentStockInfo: stocks}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoHeader)
