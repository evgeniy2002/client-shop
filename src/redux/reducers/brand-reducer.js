import { getAllBrand, getTypes } from "../../http/deviceApi"

const initialState = {
  brandsArr: [],
  panelBrands: [],
  popularBrands: [],
  recommendBrands: []
}

const SET_BRANDS = 'SET-BRANDS'
const SET_PANEL_BRANDS = 'SET-PANEL-BRANDS'
const SET_POPULAR_BRANDS = 'SET-POPULAR-BRANDS'
const SET_RECOMMEND_BRANDS = 'SET-RECOMMEND-BRANDS'

const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANDS: {
      return {
        ...state,
        brandsArr: action.payload
      }
    }
    case SET_PANEL_BRANDS: {
      const panelItems = {
        title: action.payload.title,
        otherBrands: action.payload.data
      }

      return {
        ...state,
        panelBrands: [...state.panelBrands, panelItems]

      }
    }
    case SET_POPULAR_BRANDS: {

      return {
        ...state,
        popularBrands: action.payload
      }
    }
    case SET_RECOMMEND_BRANDS: {

      return {
        ...state,
        recommendBrands: action.payload
      }
    }
    default:
      return state
  }
}

export const setBrands = (brands) => ({ type: SET_BRANDS, payload: brands })
export const setPanelBrands = ({ title, data }) => ({ type: SET_PANEL_BRANDS, payload: { title, data } })
export const setPopularBrands = (data) => ({ type: SET_POPULAR_BRANDS, payload: data })
export const setRecommendBrands = (data) => ({ type: SET_RECOMMEND_BRANDS, payload: data })


export const setPunelBrandsThunkCreator = (paramsBrand) => {
  return async (dispatch) => {

    getTypes()
      .then(({ data }) => {
        let brand = data.filter(item => item.type_name !== paramsBrand)

        brand.map(item => {
          getAllBrand(item.id)
            .then(({ data }) => {
              dispatch(setPanelBrands({ title: item.type_name, data }))
            })
        })
      })
      .catch(err => console.error(err))
  }
}


export default BrandReducer