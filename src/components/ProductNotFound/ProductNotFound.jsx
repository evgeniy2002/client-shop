import React from 'react'
import s from './ProductNotFound.module.css'

import img from '../../assets/images/product_not_found.png'

export default function ProductNotFound() {

  return (
    <div className={s.content}>
      <div className={s.content_img}><img src={img} alt="" /></div>
      <div className={s.content_title}>Ничего не найдено</div>
    </div>
  )
}
