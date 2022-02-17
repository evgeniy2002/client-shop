import React from 'react'
import { useLocation } from 'react-router-dom'
import { updateRatign } from '../../../../http/deviceApi'
import s from '../../Header.module.css'

import arrow from '../../../../assets/images/icons/next-arrow.svg'

export default function HeaderFormColumn({ item }) {

  const location = useLocation()

  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }


  return (

    <div className={s.form_subdate_column}>
      {
        <a href={'/device/' + item.id} className={s.form_subdate_item} onClick={() => changeRatingItem(item.id, item.rating)}>
          {/* <div className={s.form_item_img + ' ' + 'ibg'}>
            <img src={item.img} alt="" />
          </div> */}
          <div className={s.form_item_text}>{item.device_name}</div>

          {/* <div className={s.form_item_price}>{item.price}&#8381;</div> */}
        </a>
      }

    </div>
  )
}
