import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { ReactTable } from 'react-table'
import { createStock, saveStockToPortfolio, getUsersStocks, getPortfolios } from '../adapter'
import PortfolioOptions from './PortfolioOptions'

class StockDisplay extends React.Component{
  state = {
    priceArray: [],
    dateArray: []
  }

  setPriceArray = () => {
    const closeArray = this.props.stock.chart.map((day) => day.close)
  }

  setDateArray = () => {
    const dayArray = this.props.stock.chart.map((day) => day.date)
  }

  renderChart = () => {
    const closeArray = this.props.stock.chart.map((day) => day.close)
    const dayArray = this.props.stock.chart.map((day) => day.date)

    return (
      // <ReactTable />
      <div>
        <div className='row'>
          <Line data={{labels: dayArray,
            datasets: [{
              label: this.props.stock.symbol,
              // backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: closeArray,
              maintainAspectRatio: false
            }]
          }} height={100} width={300}/>
        </div>

        <table>
          <thead>
            <tr>
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
            <tr>
              <td>{this.props.stock.marketcap}</td>
              <td>{this.props.stock.week52high}</td>
              <td>{this.props.stock.week52low}</td>
              <td>{this.props.stock.priceToBook}</td>
              <td>{this.props.stock.priceToSales}</td>
              <td>{this.props.stock.latestEPS}</td>
              <td>{this.props.stock.beta}</td>
              <td>{this.props.stock.returnOnEquity}</td>
              <td>{this.props.stock.peRatio}</td>
            </tr>
          </tbody>
        </table>
      </div>

      )
  }

  render(){
    return(
      <React.Fragment>
        <div className='row'>
          <div className="col s6">
            <img src={this.props.stock.logo} height="70" width="70" alt=''/>
            <h5>{this.props.stock.companyName}({this.props.stock.symbol})</h5>
            <h3>{this.props.stock.price}</h3>
            {/* {this.props.currentUser ? <button onClick={this.handleClick}>Save Stock</button> : null} */}
            {this.props.currentUser ? <PortfolioOptions currentUser={this.props.currentUser} currentStock={this.props.stock}/> : null}
          </div>
          <div className="col s6">
            {this.props.stock.description}
          </div>
        </div>

        <div className='row'>
          {this.renderChart()}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stock: state.stock,
    currentUser: state.currentUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveStockToPortfolio: (currentUser, stock) => dispatch({type: "SAVE_STOCK_TO_PORTFOLIO", payload: {currentUser: currentUser, stock: stock}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockDisplay)
