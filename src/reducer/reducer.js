const defaultState = {
  content: '',
  stock: '',
  signUpState: false,
  loginState: false,
  currentUser: null,
  UserPageDisplayState: null,
  currentPortfolioStocks: [],
  currentPortfolioID: null,
  currentStockInfo: [],
  currentUserPortfolios: []
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
    case 'STOCK_INFO':
      console.log('inside STOCK_INFO: ', action.payload.currentStockInfo);
      return {...state, currentStockInfo: [...state.currentStockInfo, action.payload.currentStockInfo]}
      // return {...state, currentStockInfo: action.payload.currentStockInfo}
    case 'RESET_STOCK_INFO_ARRAY':
      return {...state, currentStockInfo: []}
    case 'DELETE_STOCK_INFO':
      return {...state, currentStockInfo: [...state.currentStockInfo.filter( stock => stock.id !== action.payload.stockID)]}
    case 'CURRENT_PORTFOLIOS':
      return {...state, currentUserPortfolios: action.payload.currentUserPortfolios}
    default:
      return state
  }
}

export default reducer
