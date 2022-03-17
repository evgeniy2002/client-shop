import React from 'react'
import Preloader from '../../../assets/loader/Preloader'


import s from '../Products.module.css'

export default function RecommendBrands({ recommendBrands, cancel }) {

  return (

    <div className={s.products_body_middle}>
      <div className={s.products_body_title}><span>Предложения от брендов</span></div>

      <div className={s.products_middle_row}>
        {
          recommendBrands.length
            ? recommendBrands.map(brand => (

              <div key={brand.brands_name} className={s.products_middle_columns}>
                <a href={`/category/${brand.type_name}/${brand.brands_name}`} className={s.products_middle_item}>

                  <div className={s.products_item_img + ' ' + 'ibg'}>
                    <img src={brand.img} alt="" />
                  </div>

                  <div className={s.products_brand_name}><span>{brand.brands_name}</span></div>
                </a>
              </div>
            ))
            : !recommendBrands.length
            && <div className={s.products_cancel_img}>

              <img src={cancel} alt="" />
            </div>
        }


      </div>


    </div>

  )
}
