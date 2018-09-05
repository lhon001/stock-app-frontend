export const renderPortfolios = (portfolios) => {
  return (dispatch) => {
    dispatch({
      type: 'CURRENT_PORTFOLIOS',
      // payload: {currentUserPortfolios: portfolios}
      payload: portfolios
    })
  }
}

// export const setProjects = (projects) => {
//   return (dispatch) => {
//     //getProjects()?
//     dispatch({
//       type: SET_PROJS,
//       payload: projects
//     })
//   }
// }
