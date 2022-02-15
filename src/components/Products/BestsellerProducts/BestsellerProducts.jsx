import React from 'react'

import s from '../Products.module.css'

export default function BestsellerProducts({ popularGoods, cancel, changeRatingItem }) {
  return (
    <div className={s.products_body_footer}>
      <div className={s.products_body_title}><span>Хит продаж</span></div>

      <div className={s.products_header_row}>
        {popularGoods.length
          ? popularGoods.map(item => (
            <a key={item.id} href={"/device/" + item.id} className={s.products_header_item} onClick={() => changeRatingItem(item.id, item.rating)}>
              {
                item.img === null
                  ? <div className={s.products_item_img + ' ' + s.products_item_cancel + ' ' + 'ibg'}></div>
                  : <div className={s.products_wrapper_item_img}>

                    <div className={s.products_item_img + ' ' + 'ibg'}>
                      <img src={item.img} alt="" />
                    </div>

                    <div className={s.info_about_discounts}>
                      <span>-35&#x25;</span>
                    </div>
                  </div>

              }

              <div className={s.wrapper_price_info}>
                <div className={s.products_item_price}><span>{item.price} &#8381;</span></div>
                <div className={s.products_item_old_price}><span>{item.price} &#8381;</span></div>

              </div>
              <div className={s.products_item_name}><span>{item.device_name}</span></div>
              <div className={s.products_item_btn}><span>Написать</span></div>
            </a>

          ))
          : <div className={s.products_header_item + ' ' + s.products_cancel_item}>
            <div className={s.products_item_img}>

              <img src={cancel} alt="" />
            </div>
          </div>
        }

      </div>
    </div>
  )
}
