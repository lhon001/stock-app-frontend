import React from 'react'
import { connect } from 'react-redux'
import { deleteStock, getPortfolioStocks, deletePortfolio } from '../adapter'
import StockInfoRow from './StockInfoRow'
import StockInfoHeader from './StockInfoHeader'
import { Line } from 'react-chartjs-2'

class PortfolioStocksInfo extends React.Component {

  handleClick = () => {
    this.props.currentPortfolio(this.props.currentID)
    deletePortfolio(this.props.currentID)
    this.props.currentPortfolioStocks(this.props.currentStocksInfo)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currentID ?
          <table className="striped responsive-table">
            <thead>
              <StockInfoHeader />
            </thead>
            <tbody>
              <StockInfoRow />
            </tbody>
          </table>
          : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioStocksInfo)
