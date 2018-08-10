import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'

class StockDisplay extends React.Component{

  // sortedChartData = (this.props.stock.chart) => {
  //   return (
  //     labels: ["January", "February"],
  //     datasets: [{
  //       label: "My First dataset",
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgb(255, 99, 132)',
  //       data: [0, 10, 5, 2, 20, 30, 45],
  //       }]
  //   )
  //
  // }


  render(){
    console.log(this.props.stock.chart);
    // const chartData = {data: [0, 10, 5, 2, 20, 30, 45]}
    return(
      <div>
        <h2>{this.props.stock.symbol}</h2>
        <h1>{this.props.stock.companyName}</h1>
        <p>{this.props.stock.description}</p>

        <Line data={{labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
            }]
          }}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {stock: state.stock};
}

export default connect(mapStateToProps)(StockDisplay)
