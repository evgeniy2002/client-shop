import React from 'react'
import Main from '../components/Main/Main'
import Products from '../components/Products/Products'
import About from '../components/About/About'
import Preloader from '../assets/loader/Preloader'

export default function MainPage() {
  return (

    <div >

      <Main /> 
      <Products />
      <About />
    </div>

  )
}
