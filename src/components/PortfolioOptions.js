import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { getPortfolios, getPortfolioStocks, createStock, saveStockToPortfolio } from '../adapter'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class PortfolioOptions extends React.Component {

  state = {
    selectedPortfolios: [],
    availablePortfolios: []
  }

  componentDidMount() {
    getPortfolios(this.props.currentUser)
      .then(userPortfolios => {
        // console.log(userPortfolios);
        return (
          userPortfolios.forEach((singlePortfolio) => {
            this.setState({...this.state,
            availablePortfolios: [...this.state.availablePortfolios, singlePortfolio]}, () => {
              console.log(this.state.availablePortfolios);
            })
          })
        )
      })
  }

  handleChange = (e) => {
    this.setState({
      selectedPortfolios: e.target.value
    });
  }

  handleClick = () => {
    console.log(this.state.selectedPortfolios);

    let selectedPortfolioObjs = []
    this.state.availablePortfolios.forEach(portfolio => {
      return(
        this.state.selectedPortfolios.includes(portfolio.name) ?
          selectedPortfolioObjs.push(portfolio) : null
      )
    })

    selectedPortfolioObjs.forEach(portfolioObj => {
      let symbolArray = []
      getPortfolioStocks(portfolioObj.id)
      .then(portfolioStocks => {
        portfolioStocks.forEach(stockObj => {
          symbolArray.push(stockObj.symbol)
        })
        if (!symbolArray.includes(this.props.currentStock.symbol)){
          createStock(this.props.currentStock)
          .then(createdStock => saveStockToPortfolio(portfolioObj.id, createdStock.id))
        } else {
          console.log("duplicates detected");
        }
      })
    })

  }

  render() {
    console.log(this.state.selectedPortfolios);
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="select-multiple-checkbox">Save To ...</InputLabel>
            <Select
              multiple
              value={this.state.selectedPortfolios}
              onChange={this.handleChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {this.state.availablePortfolios.map(portfolio => {
                // console.log(this.state.selectedPortfolios.indexOf(portfolio))
                // console.log(portfolio)
                return (
                <MenuItem key={portfolio.id} value={portfolio.name}>
                  <Checkbox checked={this.state.selectedPortfolios.indexOf(portfolio.name) > -1} />
                  <ListItemText primary={portfolio.name} />
                </MenuItem>
              )
            })}

            </Select>
          </FormControl>
        </div>
        <button onClick={this.handleClick}>Save</button>
      </React.Fragment>
    )
  }

}

PortfolioOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PortfolioOptions)
