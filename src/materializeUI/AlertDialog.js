import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { deleteUser, deleteStock, deletePortfolio, getPortfolioStocks } from '../adapter'

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.currentUserPortfolios.forEach((portfolio) => {
      getPortfolioStocks(portfolio.id)
      .then(stocks => {
        stocks.forEach((stock) => deleteStock(stock.id))
      })
      deletePortfolio(portfolio.id)
    })
    deleteUser(this.props.currentUser)
    this.props.showSearchPage()
    localStorage.removeItem("currentUser")
    this.props.deleteUser() // resets currentUser state so page rerenders
  }

  render() {
    return (
      <div>
        <button className="btn-small waves-effect waves-light material-icons right" onClick={this.handleClickOpen}>Delete Account</button>
        {/* <Button onClick={this.handleClickOpen}>Delete Account</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Account Deletion?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting your account will erase all saved stock data.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentUserPortfolios: state.currentUserPortfolios
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSearchPage: () => dispatch({type:"SAVE_SEARCHED_STOCK", payload: {stock: 'tsla'}}),
    deleteUser: () => dispatch({type:"DELETE_USER", payload: {currentUser: null}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
