import { getTypes } from "../../http/deviceApi"

const initialState = {
  typesArr: []
}

const SET_TYPES = 'SET-TYPES'

const TypeReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_TYPES: {
      return {
        ...state,
        typesArr: [...state.typesArr, ...action.payload]
      }
    }
  
    default:
      return state
  }
}

export const setTypes = (types) => ({type: SET_TYPES, payload: types})

export const getTypeTC = () => {
  return async (dispatch) => {
    getTypes()
    .then(({ data }) => {
      dispatch(setTypes(data))  
    })
    .catch(err => console.error(err))
  }
}


export default TypeReducer