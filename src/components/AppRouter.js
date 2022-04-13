import React, {Suspense} from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Admin from '../pages/Admin'
// import DevicePage from '../pages/DevicePage'
// import MainPage from '../pages/MainPage'
// import Shop from '../pages/Shop'
import AllCategory from '../pages/AllCategory'
import { ADMIN_ROUTE, DEVICE_ROUTE, MAIN_ROUTE, SHOP_ROUTE } from '../utils/constans'
import Header from '../components/Header/Header'
import { useSelector } from 'react-redux'
import FooterInfo from './FooterInfo/FooterInfo'
import Preloader from '../assets/loader/Preloader'



const MainPage = React.lazy(() => import('../pages/MainPage'));
const Shop = React.lazy(() => import('../pages/Shop'));
const DevicePage = React.lazy(() => import('../pages/DevicePage'));



export default function AppRouter() {

  const location = useLocation()

  const isAuth = useSelector(state => state.auth.isAuth)

  const [adaptiveFooter, setAdaptiveFooter] = React.useState(false)

  React.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setAdaptiveFooter(true)
    }

  }, [])

  
  return (
    <div className="wrapper">
      <div className="page">
      
        {
          location.pathname.includes('admin')
            ? ''
            : <Header />
        }

        <div className="content">
          <Switch>
            <Route path={ADMIN_ROUTE} component={() => <Admin isAuth={isAuth} />} />
            <Route path='/all_category/' component={() => <AllCategory/>} />
            <Route path='/category/:brand?/:type?/device/:id' component={() => <Suspense fallback={<div className='loading'><Preloader /></div>}><DevicePage/></Suspense>} />
            <Route path={DEVICE_ROUTE} component={() => <Suspense fallback={<div className='loading'><Preloader /></div>}><DevicePage/></Suspense>} />
            <Route path={SHOP_ROUTE} component={() => <Suspense fallback={<div className='loading'><Preloader /></div>}><Shop/></Suspense>} />
            {/* <Route path={SHOP_ROUTE} component={() => <Shop /> } /> */}
            <Route path={MAIN_ROUTE} component={() => <Suspense fallback={<div className='loading'><Preloader /></div>}><MainPage/></Suspense>} />

            <Redirect to={MAIN_ROUTE} />
          </Switch>

        </div>
        {
          adaptiveFooter
            ? <FooterInfo />
            : null
        }


      </div>

    </div>

  )
}
