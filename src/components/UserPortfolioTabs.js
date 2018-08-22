import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getPortfolios } from '../adapter'

class UserPortfolioTabs extends React.Component {
  state = {
    currentTab: null,
    portfolios: []
  }

  componentDidMount() {
    getPortfolios(this.props.currentUser)
      .then(userPortfolios => {
        return (
          userPortfolios.forEach((singlePortfolio) => {
            this.setState({...this.state,
            portfolios: [...this.state.portfolios, singlePortfolio]})
          })
        )
      })
  }

  renderPortfolios = () => {
    // write function that takes all the portfolio IDs and returns lowest one
    // 
    // let tabValue =
    // if (this.state.currentTab === null){
    //
    // }
    return (
      <div className='row'>
        <AppBar position="static">
          <Tabs value={this.state.currentTab} >
            {this.state.portfolios.map(portfolio => {
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
        {this.renderPortfolios()}
      </React.Fragment>
    )
  }

}

export default UserPortfolioTabs
