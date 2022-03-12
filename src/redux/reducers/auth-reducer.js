import { host } from "../../http"

const initialState = {
  currentAdmin: {},
  isAuth: false
}

const SET_IS_AUTH = 'SET-IS-AUTH'
const LOGOUT_IS_AUTH = 'LOGOUT-IS-AUTH'


const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: true
      }
    }
    case LOGOUT_IS_AUTH: {
      return {
        ...state,
        isAuth: false
      }
    }
    default:
      return state
  }
}

export const setIsAuth = () => ({type: SET_IS_AUTH})
export const logout = () => ({type: LOGOUT_IS_AUTH})

export const loginTC = (login, password) => {
  return async dispatch => {
    try {
   
      const responce = await host.post('api/admin_panel/login', {
        login, password
      })
      
      dispatch(setIsAuth())
      
      localStorage.setItem('token', responce.data.token)
    } catch (error) {
      alert(error)
    }
  }
}

  export default AuthReducer