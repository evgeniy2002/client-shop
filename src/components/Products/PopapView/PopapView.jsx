import React from 'react'
import s from './PopapView.module.css'

export default function PopapView({ item }) {
  console.log(item)
  return (
    <div className={s.popapView}>
      <div className={s.popapView_body}>
        <div className={s.popapView_title}>{item.device_name}</div>
        <div className={s.popapView_row}>

          <div className={s.popapView_columns}>
            <div className={s.popapView_img + ' ' + 'ibg'}>
              <img src={item.img} alt="" />
            </div>
          </div>
          <div className={s.popapView_columns}>
            <div className={s.popapView_info}>
              <div className={s.popapView_info_price}>
                <div className={s.popapView_current_price}>{item.price}</div>
                <div className={s.popapView_old_price}>{item.price}</div>
              </div>
            </div>
            <div className="popapView_info_btn">Написать продавцу</div>
          </div>
        </div>
      </div>
    </div>
  )
}
