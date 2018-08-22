const defaultState = {
  content: '',
  stock: '',
  signUpState: false,
  loginState: false,
  currentUser: null,
  UserPageDisplayState: null,
  currentPortfolioStocks: [],
  currentPortfolioID: null
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type){
    case 'SAVE_SEARCHED_STOCK':
      return {...state, stock: action.payload.stockObj, content: action.payload.content}
    case 'SIGNUP':
      return {...state, signUpState: action.payload.signUpState, content: action.payload.content}
    case 'SHOW_USER_PAGE':
      return {...state, currentUser: action.payload.currentUser, content: action.payload.content}
    case 'LOGIN':
      return {...state, loginState: action.payload.loginState, content: action.payload.content}
    case 'LOGOUT':
      return {...state, loginState: action.payload.loginState, currentUser: action.payload.currentUser, content: ''}
    case 'INVALID_STOCK_SYMBOL':
      return {...state, content: action.payload.content}
    case 'SAVE_STOCK_TO_PORTFOLIO':
      return {...state, currentUser: action.payload.currentUser, stock: action.payload.stock}
    case 'SET_CURRENT_PORTFOLIO_STOCKS':
      return {...state, currentPortfolioStocks: action.payload.currentPortfolioStocks}
    case 'CURRENT_PORTFOLIO_ID':
      return {...state, currentPortfolioID: action.payload.currentPortfolioID}
    // case 'DELETE_STOCK': 
    //   return {...state, currentPortfolioStocks: action.payload.currentPortfolioStocks}
    default:
      return state
  }
}

export default reducer
