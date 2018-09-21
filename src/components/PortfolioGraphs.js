import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { getStockInfo } from '../adapter'

class PortfolioGraphs extends React.Component {

  // renderChart = () => {
  //   console.log(this.props.currentPortfolioStocks);
  //   let dayArray = []
  //   this.props.currentPortfolioStocks.forEach((stock) => {
  //     // console.log(stock);
  //     getStockInfo(stock.symbol)
  //     .then(stockInfo => {
  //         // console.log(stockInfo.chart);
  //       stockInfo.chart.forEach((element) => {
  //         console.log(element.date);
  //         dayArray.push(element.date)
  //       })
  //       this.props.setPortfolioGraphsDates(dayArray)
  //       console.log(dayArray);
  //     })
  //   })
  // }

  render() {
    return (
      <React.Fragment>
        <Line data={{labels: null, datasets: [
          		{
          			label: "My First dataset",
          			pointHighlightStroke: "rgba(220,220,220,1)",
          			data: [65, 59, 80, 81, 56, 55, 40]
          		},
          		{
          			label: "My Second dataset",
          			pointHighlightStroke: "rgba(151,187,205,1)",
          			data: [28, 48, 40, 19, 86, 27, 90]
          		}
          	]}
          }/>
        {/* {this.renderChart()} */}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentPortfolioStocks: state.currentPortfolioStocks,
    portfolioGraphsDates: state.portfolioGraphsDates
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPortfolioGraphsPrice: (prices) => dispatch({type:"SET_PORTFOLIO_GRAPH_PRICES", payload: {portfolioGraphsPrices: prices}}),
//     setPortfolioGraphsDates: (dates) => dispatch({type:"SET_PORTFOLIO_GRAPH_DATES", payload: {portfolioGraphsDates: dates}}),
//   }
// }

export default connect(mapStateToProps)(PortfolioGraphs)
