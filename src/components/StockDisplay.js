import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { ReactTable } from 'react-table'
import { createStock, saveStockToPortfolio, getUsersStocks, getPortfolios } from '../adapter'

class StockDisplay extends React.Component{
  state = {
    priceArray: [],
    dateArray: []
  }

  setPriceArray = () => {
    // console.log(this.props.stock.chart);
    const closeArray = this.props.stock.chart.map((day) => day.close)
    // console.log(this.state.priceArray);
  }

  setDateArray = () => {
    const dayArray = this.props.stock.chart.map((day) => day.date)
    // console.log(dayArray);
  }


  handleClick = () => {
    // check if stock exists in portfolio first
    let userPortfolios = []
    console.log('before: ', userPortfolios);
    getPortfolios(this.props.currentUser)
      .then(portfolios => {
        return (
          portfolios.forEach((singlePortfolio) => {
            userPortfolios.push(singlePortfolio)
          })
        )
      })

    console.log("after: ", userPortfolios);

    let currentUserStocks = []
    getUsersStocks(this.props.currentUser)
      .then(userStocks => {
        console.log(userStocks);
        currentUserStocks = userStocks.filter(stock => stock.companyName === this.props.stock.companyName)
        if (!currentUserStocks.length > 0){
          console.log(userPortfolios[0].id);
          createStock(this.props.stock) // create the stock
          .then(stock => saveStockToPortfolio(userPortfolios[0].id, stock.id)) // associate the stock to the portfolio
          // currently 5 is the hardcoded default stock. will have to write a function that grabs a
          // users portoflios and allows users to choose which potfolio they want to save to
        } else {
          alert("This stock is already in your portfolio");
        }
      }
    )
  }

  renderChart = () => {
    // console.log(this.props.stock);
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
          }}/>
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
      <div>
        <React.Fragment>
          <div className='row'>
            <div className="col s6">
              <img src={this.props.stock.logo} height="70" width="70" alt=''/>
              <h5>{this.props.stock.companyName}({this.props.stock.symbol})</h5>
              <h3>{this.props.stock.price}</h3>
              {this.props.currentUser ? <button onClick={this.handleClick}>Save Stock</button> : null}
            </div>
            <div className="col s6">
              {this.props.stock.description}
            </div>
          </div>

          <div className='row'>
            {this.renderChart()}
          </div>
        </React.Fragment>
      </div>
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
