import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit,
//   },
//   input: {
//     display: 'none',
//   },
// });

class UserLogin extends React.Component{
  // function = () => {
  //   const { classes } = props;
  // }()

  render(){
    console.log(UserLogin.propTypes);
    return(
      <div>
        {/* <button className="btn-small waves-effect waves-light material-icons right" onClick={this.props.loginUser}>Login</button> */}
        <Button onClick={this.props.loginUser}>Login</Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loginUser: () => dispatch({type: 'LOGIN', payload: {loginState: true, content: "loginForm"}})
  }
}

// UserLogin.propTypes = {
//   classes: PropTypes.object,
// };

// export default withStyles(styles)(UserLogin)
export default connect(null, mapDispatchToProps)(UserLogin)
