import React from 'react'

import image from './Ellipsis-2.9s-30px.svg'

export default function Preloader(props) {
  return (
    <div className='preloader'>
      <img src={image} alt="" />
    </div>
  )
}
