import React from 'react'
import ContentLoader from "react-content-loader"
import image from './Ellipsis-3.4s-150px.svg'
import image1 from './Ellipsis-2.9s-30px.svg'

export default function Preloader(props) {
  return (
    <div className='preloader'>
      <img src={image1} alt="" />
    </div>
  )
}
