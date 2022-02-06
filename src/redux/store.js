import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import DevicesReducer from './reducers/devices-reducer'
import ShopReducer from './reducers/shop-reducer'
import TypeReducer from './reducers/type-reducer'
import { reducer as formReducer } from 'redux-form'
import BrandReducer from './reducers/brand-reducer'
import thunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/auth-reducer'

let rootReducer = combineReducers({
  devices: DevicesReducer,
  types: TypeReducer,
  shop: ShopReducer,
  brands: BrandReducer,
  auth: AuthReducer,
  form: formReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store

export default store