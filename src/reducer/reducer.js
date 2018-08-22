const defaultState = {
  content: '',
  stock: '',
  signUpState: false,
  loginState: false,
  currentUser: null,
  UserPageDisplayState: null,
  currentPortfolioStocks: []
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
    default:
      return state
  }
}

export default reducer
