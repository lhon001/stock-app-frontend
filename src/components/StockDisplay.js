import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { ReactTable } from 'react-table'

class StockDisplay extends React.Component{
  state = {
    priceArray: [],
    dateArray: [],
  }

  setPriceArray = () => {
    console.log(this.props.stock.chart);
    const closeArray = this.props.stock.chart.map((day) => day.close)
    console.log(this.state.priceArray);
  }

  setDateArray = () => {
    const dayArray = this.props.stock.chart.map((day) => day.date)
    console.log(dayArray);
  }

  renderChart = () => {
    const closeArray = this.props.stock.chart.map((day) => day.close)
    const dayArray = this.props.stock.chart.map((day) => day.date)

    return (
      // <ReactTable />
      <Line data={{labels: dayArray,
          datasets: [{
            label: this.props.stock.symbol,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: closeArray,
          }]
        }}/>
      )
  }

  render(){
    return(
      <div>
        <h2>{this.props.stock.symbol}</h2>
        <h1>{this.props.stock.companyName}</h1>
        <p>{this.props.stock.description}</p>

        {this.props.stock ? this.renderChart() : null}

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {stock: state.stock};
}

export default connect(mapStateToProps)(StockDisplay)
