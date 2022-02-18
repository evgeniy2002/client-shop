import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Admin from '../pages/Admin'
import DevicePage from '../pages/DevicePage'
import MainPage from '../pages/MainPage'
import Shop from '../pages/Shop'
import { ADMIN_ROUTE, DEVICE_ROUTE, MAIN_ROUTE, MY_FAVORITES, SHOP_ROUTE } from '../utils/constans'
import Header from '../components/Header/Header'
import AllCategory from '../pages/AllCategory'
import PresentPage from '../pages/PresentPage'
import { useSelector } from 'react-redux'
import FooterInfo from './FooterInfo/FooterInfo'
import MyFavorites from '../pages/MyFavorites'

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
            <Route path='/present' component={PresentPage} />
            <Route path='/all_category/' component={AllCategory} />
            <Route path='/category/:brand?/:type?/device/:id' component={DevicePage} />
            <Route path={DEVICE_ROUTE} component={DevicePage} />
            <Route path={ADMIN_ROUTE} component={() => <Admin isAuth={isAuth} />} />
            <Route path={MY_FAVORITES} component={MyFavorites} />
            <Route path={SHOP_ROUTE} component={Shop} />
            <Route path={MAIN_ROUTE} component={MainPage} />

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
