import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks } from '../adapter'
import StockInfoRow from './StockInfoRow'

class PortfolioStocksInfo extends React.Component {

  // handleClick = (stock) => {
  //   deleteStock(stock.id)
  //   .then(resp => {
  //     getPortfolioStocks(this.props.currentID)
  //     .then(portfolioStocks => {
  //       this.props.currentPortfolioStocks(portfolioStocks)
  //     })
  //   })
  // }

  render() {
    return (
      <React.Fragment>
          <table className="striped responsive-table">
            <thead>
              <tr>
                <th></th>
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
            </thead>

            <tbody>
              {this.props.currentStocks ? <StockInfoRow /> : null }
            </tbody>
          </table>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
//   }
// }

export default connect(mapStateToProps)(PortfolioStocksInfo)
