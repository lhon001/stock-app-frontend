import React from 'react'
import { deleteStock, getPortfolioStocks } from '../adapter'

class PortfolioStocksInfo extends React.Component {
  state = {
    stocks : this.props.currentInfoArray
  }

  handleClick = (stock) => {
    console.log(stock.id);
    deleteStock(stock.id)
    .then(resp => {
      getPortfolioStocks(this.props.portfolioID)
      .then(portfolioStocks => {
        this.setState({
          stocks : portfolioStocks
        })
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
          {this.props.stockInfoArray.map(detailedStock => {
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
    console.log("current portfolios stocks info: ", this.props.stockInfoArray);
    return (
      <React.Fragment>
        {this.props.stockInfoArray.length > 0 ? this.renderStocks() : <h3>No Stocks Added</h3>}
      </React.Fragment>
    )
  }
}

export default PortfolioStocksInfo
