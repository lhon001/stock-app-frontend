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

  renderPortfolioGraphs = () => {
    console.log("current graph prices: ", this.props.currentPortfolioGraphsPrices);
    return (
      <React.Fragment>
        <Line data={{labels: this.props.currentPortfolioGraphsDates, datasets: [
          		{
          			label: "My First dataset",
          			pointHighlightStroke: "rgba(220,220,220,1)",
          			data: this.props.currentPortfolioGraphsPrices
          		},
          		{
          			label: "My Second dataset",
          			pointHighlightStroke: "rgba(151,187,205,1)",
          			data: this.props.currentPortfolioGraphsPrices
          		}
          	]}
          }/>
      </React.Fragment>
    )
  }

  render(){
    return(
      <React.Fragment>
        {/* {this.props.currentPortfolioID ? <PortfolioGraphs /> : null} */}
        {this.props.currentPortfolioID ? this.renderPortfolioGraphs() : null}
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
