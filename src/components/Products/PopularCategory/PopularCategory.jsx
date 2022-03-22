import React from 'react'
import s from '../Products.module.css'



export default function PopularCategory({ popularBrands, cancel }) {
  return (
    <div className={s.products_body_header}>
      <div className={s.products_body_title}><span>Популярные категории</span></div>

      <div className={s.products_header_row}>
        {popularBrands.length
          ?
          popularBrands.map(item => (
            <a key={item.id} href={"/category/" + item.type_name} className={s.products_header_item}>
              {/* {
                item.img === null
                  ? <div className={s.products_item_img + ' ' + s.products_item_cancel + ' ' + 'ibg'}></div>
                  : <div className={s.products_item_img + ' ' + 'ibg'}>
                    <img src={item.img} alt="" />
                  </div>
              } */}
              <div className='brand_item_title'><span>{item.type_name}</span></div>
            </a>

          ))
          : !popularBrands.length
          && <div className={s.products_cancel_img}>

            <img src={cancel} alt="" />
          </div>

        }

      </div>
    </div>
  )
}
