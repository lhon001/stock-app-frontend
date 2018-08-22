import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks } from '../adapter'

class PortfolioStocksInfo extends React.Component {

  handleClick = (stock) => {
    deleteStock(stock.id)
    .then(resp => {
      getPortfolioStocks(this.props.currentID)
      .then(portfolioStocks => {
        this.props.currentPortfolioStocks(portfolioStocks)
      })
    })
  }

  renderStocks = () => {
    return (
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
          {this.props.currentStocks.map(detailedStock => {
            return (
              <tr key={detailedStock.id}>
                <td><button onClick={(e) => this.handleClick(detailedStock)}>X</button></td>
                <td>{detailedStock.companyName}</td>
                <td>{detailedStock.symbol}</td>
                <td>{detailedStock.price}</td>
                <td>{detailedStock.marketcap}</td>
                <td>{detailedStock.week52high}</td>
                <td>{detailedStock.week52low}</td>
                <td>{detailedStock.priceToBook}</td>
                <td>{detailedStock.priceToSales}</td>
                <td>{detailedStock.latestEPS}</td>
                <td>{detailedStock.beta}</td>
                <td>{detailedStock.returnOnEquity}</td>
                <td>{detailedStock.peRatio}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    console.log("current portfolios stocks info: ", this.props.currentStocks);
    console.log("current portfolio ID: ", this.props.currentID);
    return (
      <React.Fragment>
        {this.props.currentStocks.length > 0 ? this.renderStocks() : <h3>No Stocks Added</h3>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentID: state.currentPortfolioID,
    currentStocks: state.currentPortfolioStocks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPortfolioStocks: (portfolioStocks) => dispatch({type: 'SET_CURRENT_PORTFOLIO_STOCKS', payload: {currentPortfolioStocks: portfolioStocks}}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioStocksInfo)
