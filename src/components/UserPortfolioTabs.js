import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Line } from 'react-chartjs-2'
import { getPortfolios } from '../adapter'
import { connect } from 'react-redux'
import { renderPortfolios } from '../actions/actions'
import PortfolioGraphs from './PortfolioGraphs'

class UserPortfolioTabs extends React.Component {
  state = {
    currentTab: null,
    portfolios: []
  }

  componentDidMount() {
    let portfolios = []
    getPortfolios(this.props.currentUser)
      .then(userPortfolios => {
        this.props.renderPortfolios(userPortfolios)
      })
  }

  renderPortfolios = () => {
    return (
      <div className='row'>
        <AppBar position="static">
          <Tabs value={this.state.currentTab} >
            {this.props.currentUserPortfolios.map(portfolio => {
              return (
                <Tab key={portfolio.id} label={portfolio.name} value={portfolio.id} onClick={(e) => this.props.handleTabSelect(portfolio.id)} />
              )}
            )}
          </Tabs>
        </AppBar>
      </div>
    )
  }

  lineDataset = () => {
    console.log(this.props.currentPortfolioGraphsPrices.length)
    if (this.props.currentPortfolioGraphsPrices.length > 0){
      let arr = this.props.currentPortfolioGraphsPrices.map((priceArr) => {
        console.log("priceArr: ", priceArr);
        return ({
          label: "My First dataset",
          borderColor: 'rgb(255, 99, 132)',
          data: priceArr
        })
      })
      return arr}
    else {
      return null
    }
  }

  // move this to PortfolioStocksInfo?
  renderPortfolioGraphs = () => {
    return (
      <React.Fragment>
        <Line data={{labels: this.props.currentPortfolioGraphsDates, datasets:
            this.lineDataset()
          	}}/>
      </React.Fragment>
    )
  }

  render(){
    console.log("current graph prices length: ", this.props.currentPortfolioGraphsPrices);
    return(
      <React.Fragment>
        {/* {this.props.currentPortfolioID ? <PortfolioGraphs /> : null} */}
        {/* {this.props.currentPortfolioID ? this.renderPortfolioGraphs() : null} */}
        {this.props.currentUserPortfolios.length > 0 ? this.renderPortfolios() : null}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUserPortfolios: state.currentUserPortfolios,
    currentPortfolioID: state.currentPortfolioID,
    currentPortfolioGraphsPrices: state.portfolioGraphsPrices,
    currentPortfolioGraphsDates: state.portfolioGraphsDates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderPortfolios: (portfolios) => dispatch({type: 'CURRENT_PORTFOLIOS', payload: {currentUserPortfolios: portfolios}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioTabs)
