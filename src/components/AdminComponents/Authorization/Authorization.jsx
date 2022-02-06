import React from 'react';
import { useDispatch } from 'react-redux';
import { loginTC } from '../../../redux/reducers/auth-reducer';

import '../Admin.css'



export default function Authorization() {

  const dispatch = useDispatch()

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')


  const loginFunc = () => {
    dispatch(loginTC(login, password))
  }

  return (

    <div className='authorization'>
      <div className="authorization_body">

        <div className='authorization_form'>
          <div className="authorization_header">Авторизация</div>
          <input className='authorization_input' value={login} onChange={(e) => setLogin(e.target.value)} type="text" placeholder='Введите логин' />
          <input className='authorization_input' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Введите пароль' />
          <button className='authorization_btn' onClick={loginFunc}>Войти</button>
        </div>
      </div>


    </div>
  )
}

