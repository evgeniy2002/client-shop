import React from 'react'

import s from '../Products.module.css'

export default function RecommendBrands() {
  return (
    <div className={s.products_body_middle}>
      <div className={s.products_body_title}><span>Предложения от брендов</span></div>
      <div className={s.products_middle_row}>
        <div className={s.products_middle_columns}>
          <a href='#' className={s.products_middle_item}>
            
              <div className={s.products_item_img + ' ' + 'ibg'}>
                <img src='https://shop-storage.storage.yandexcloud.net/images/60aaa691c42fd48c01c85b2b9f85ee8e.png' alt="" />
              </div>
            
            <div className={s.products_brand_name}><span>Лимонады</span></div>
          </a>
        </div>
        <div className={s.products_middle_columns}>
          <a href='#' className={s.products_middle_item}>
         
            <div className={s.products_item_img + ' ' + 'ibg'}>
              <img src='https://shop-storage.storage.yandexcloud.net/images/45b817e1f9866967f0d8d5eab9346d62.png' alt="" />
            </div>
            
            <div className={s.products_brand_name}><span>Лимонады</span></div>
          </a>
        </div>

      </div>
    </div>
  )
}
