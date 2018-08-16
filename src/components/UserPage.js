import React from 'react';
import { connect } from 'react-redux'
import { getUsersStocks, getPortfolios, getStockInfo  } from '../adapter'

class UserPage extends React.Component {
  state = {
    stocks: []
  }

  componentDidMount() {
    // console.log(this.props.portfolio);
    localStorage.getItem('currentUser', this.props.currentUser.id)
    // let detailedStockInformation = []

    getUsersStocks(this.props.currentUser)
    .then(stocks => {
      // map through each stock and make a fetch request to api(getStockInfo)
      // then setState with that new array
      return (
        stocks.forEach((stock) => {
          getStockInfo(stock.symbol)
          .then(stockInfo => {
            // *****************************************************
            this.setState({...this.state,
              stocks: [...this.state.stocks, stockInfo]
            })
            // *****************************************************
          })
        })
      )
    })
  }

  renderStocks = () => {
    // console.log(this.state.stocks);
    return (
      <table className="striped responsive-table">
        <thead>
          <tr>
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
          {/* {console.log(this.state.stocks)} */}
          {this.state.stocks.map(stock => {
            console.log(this.state.stocks)
            return (
              <tr key={this.state.stocks.indexOf(stock)}>
                <td>{stock.companyName}</td>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{stock.marketcap}</td>
                <td>{stock.week52high}</td>
                <td>{stock.week52low}</td>
                <td>{stock.priceToBook}</td>
                <td>{stock.priceToSales}</td>
                <td>{stock.latestEPS}</td>
                <td>{stock.beta}</td>
                <td>{stock.returnOnEquity}</td>
                <td>{stock.peRatio}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  renderPortfolios = () => {

  }

  render(){
    // console.log(this.props.currentUser);
    return (
      <div>
        <h4>{this.props.currentUser.name}'s Account</h4>
        {this.state.stocks ? this.renderStocks() : null}
        {/* {this.state.stocks ? this.renderPortfolios() : null} */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio
  }
}

export default connect(mapStateToProps)(UserPage)
