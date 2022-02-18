import React from 'react'
import Main from '../components/Main/Main'
import Products from '../components/Products/Products'
import About from '../components/About/About'
import SuggestBrand from '../components/SuggestBrand/SuggestBrand'

export default function MainPage() {
  return (
   
      <div >

        <Main />
        <Products />
        {/* <SuggestBrand /> */}

        <About />
      </div>
  
  )
}
