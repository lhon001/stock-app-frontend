import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getPortfolios } from '../adapter'
import { connect } from 'react-redux'
import { renderPortfolios } from '../actions/actions'

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

  render(){
    return(
      <React.Fragment>
        {this.props.currentUserPortfolios.length > 0 ? this.renderPortfolios() : null}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUserPortfolios: state.currentUserPortfolios
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderPortfolios: (portfolios) => dispatch({type: 'CURRENT_PORTFOLIOS', payload: {currentUserPortfolios: portfolios}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolioTabs)
