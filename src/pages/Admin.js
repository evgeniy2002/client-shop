import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Authorization from '../components/AdminComponents/Authorization/Authorization'
import Dashboard from '../components/AdminComponents/Dashboard/Dashboard'
import NewCategory from '../components/AdminComponents/NewCategory/NewDirection'
import NewDevice from '../components/AdminComponents/NewDevice/NewDevice'
import SubCategory from '../components/AdminComponents/SubCategory/SubCategory'
import { logout } from '../redux/reducers/auth-reducer'


export default function Admin({ isAuth }) {

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log('Заглушка')
  }

  const logOutFunc = () => {
    dispatch(logout())
  }

  return (

    <div className='admin'>
      {
        isAuth
          ? <div>
            <div className="admin_header">
              <div className="container">
                <div className="admin_header_row">
                  <div className="admin_header_text">Панель управления</div>
                  <button className="admin_header_btn" onClick={logOutFunc}><span>Выход</span></button>
                </div>
              </div>
            </div>
            <div className="admin_content">
              <div className="container">
                <div className="admin_content_row">
                  <div className="admin_left_columns">
                    <div className="admin_panel">
                      <ul className='admin_panel_menu'>
                        {/* <li className='admin_panel_li'><NavLink to="/admin/dashboard" className='admin_panel_link' activeClassName="active">Dashboard</NavLink></li> */}
                        <li className='admin_panel_li'><NavLink to="/admin/new_category" className='admin_panel_link' activeClassName="active">Новая категория</NavLink></li>
                        <li className='admin_panel_li'><NavLink to="/admin/sub_category" className='admin_panel_link' activeClassName="active">Новая подкатегория</NavLink></li>
                        <li className='admin_panel_li'><NavLink to="/admin/new_device" className='admin_panel_link' activeClassName="active">Новый товар</NavLink></li>
                      </ul>
                    </div>
                  </div>
                  <div className="admin_right_columns">
                    <Switch>
                      {/* <Route path='/admin/dashboard' component={Dashboard} /> */}
                      <Route path='/admin_panel/new_category' component={() => <NewCategory onSubmit={onSubmit} />} />
                      <Route path='/admin_panel/sub_category' component={() => <SubCategory onSubmit={onSubmit} />} />
                      <Route path='/admin_panel/new_device' component={() => <NewDevice onSubmit={onSubmit} />} />


                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <Authorization />

      }
    </div>
  )
}
