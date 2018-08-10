const defaultState = {
  stock: '',
  loggedIn: false,
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type){
    case 'SAVE_SEARCHED_STOCK':
      return {...state, stock: action.payload}
    default:
      return state
  }
}

const displayStock = (state = [], action) => {

}

export default reducer
