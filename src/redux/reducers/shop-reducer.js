const initialState = {
  breadCrumbs: [],
  currentSelectBread: ''
}

const SET_BREAD_CRUMBS = 'SET-BREAD-CRUMBS'
const SET_CURRENT_CRUMBS = 'SET-CURRENT-CRUMBS'

const ShopReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_BREAD_CRUMBS:{
      return {
        ...state,
        breadCrumbs: action.payload
      }
    }
    case SET_CURRENT_CRUMBS:{
      return {
        ...state,
        currentSelectBread: action.payload
      }
    }
    default:
      return state
  }
}

export const setBreadCrumbs = (breads) => ({type: SET_BREAD_CRUMBS, payload: breads})
export const setCurrentCrumbs = (val) => ({type: SET_CURRENT_CRUMBS, payload: val})

export default ShopReducer