import { getOneDevice } from "../../http/deviceApi"

const ADD_DEVICES = 'ADD-DEVICES'
const ADD_NEW_DEVICES = 'ADD-NEW-DEVICES'
const SET_COUNT = 'SET-COUNT'
const SET_PAGE = 'SET-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_SORT_BY = 'SET-SORT-BY'
const SET_POPULAR_DEVICE = 'SET-POPULAR-DEVICE'
const SET_BESTSELLER_DEVICE = 'SET-BESTSELLER-DEVICE'
const SET_SEARCH_DEVICE = 'SET-SEARCH-DEVICE'
const SET_CURRENT_DEVICE = 'SET-CURRENT_DEVICE'
const SET_LOADED = 'SET-LOADED'

const initialState = {
  items: [],
  newItems: [],
  popularDevice: [],
  searchDevice: [],
  bestsellerDevice: [],
  currentDevice: [],
  maxPrice: 0,
  count: 0,
  page:1,
  limit: 15,
  isLoaded: false,
  sortBy: {
    type: 'rating',
    order: 'desc'
  }
}

const DevicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEVICES:
      return {
        ...state,
        items: action.payload
      }
    case ADD_NEW_DEVICES:
      return {
        ...state,
        newItems: action.payload
      }
    
    case SET_COUNT:{
      return {
        ...state,
        count: action.payload
      }
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }

    case SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload
      }
    }
    case SET_POPULAR_DEVICE: {
      return {
        ...state,
        popularDevice: action.payload
      }
    }
    case SET_BESTSELLER_DEVICE: {
      return {
        ...state,
        bestsellerDevice: action.payload
      }
    }
    case SET_SEARCH_DEVICE: {
      return {
        ...state,
        searchDevice: action.payload
      }
    }

    case SET_LOADED: {
      return {
        ...state,
        isLoaded: action.payload
      }
    }

    case SET_CURRENT_DEVICE: {
      return {
        ...state,
        currentDevice: action.payload
      }
    }
    default:
      return state
  }
}

export const addDevices = (devices) => ({type: ADD_DEVICES, payload: devices})
export const addNewDevices = (devices) => ({type: ADD_NEW_DEVICES, payload: devices})
export const setCount = (num) => ({type: SET_COUNT, payload: num})
export const setPage = (num) => ({type: SET_PAGE, payload: num})
export const setSortBy = (type) => ({type: SET_SORT_BY, payload: type})
export const setPopularDevice = (device) => ({type: SET_POPULAR_DEVICE, payload: device})
export const setBestsellerDevice = (device) => ({type: SET_BESTSELLER_DEVICE, payload: device})
export const setSearchDevice = (devices) => ({type: SET_SEARCH_DEVICE, payload: devices})
export const setLoaded = (state) => ({type: SET_LOADED, payload: state})
export const setCurrentDevicePage = (device) => ({type: SET_CURRENT_DEVICE, payload: device})

export const getDevicePageTC = (id) => {
  return async (dispatch) => {
    let {data} = await getOneDevice(id)

    dispatch(setCurrentDevicePage([data[0]]))

  }
}



export default DevicesReducer