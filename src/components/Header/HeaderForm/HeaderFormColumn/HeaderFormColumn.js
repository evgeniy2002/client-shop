import React from 'react'
import { updateRatign } from '../../../../http/deviceApi'

import s from '../../Header.module.css'

export default function HeaderFormColumn({ item }) {


  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .catch(err => console.error(err))
  }


  return (

    <div className={s.form_subdate_column}>
      {
        <a href={'/device/' + item.id} className={s.form_subdate_item} onClick={() => changeRatingItem(item.id, item.rating)}>

          <div className={s.form_item_text}>{item.device_name}</div>

        </a>
      }

    </div>
  )
}
