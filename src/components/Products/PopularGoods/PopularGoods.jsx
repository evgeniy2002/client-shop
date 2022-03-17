import React from 'react'
import Preloader from '../../../assets/loader/Preloader'
import s from '../Products.module.css'

export default function PopularGoods({ popularGoods, cancel, changeRatingItem, changeRatingLinkCount }) {


  return (
    <div className={s.products_body_footer}>
      <div className={s.products_body_title}><span>Популярные товары</span></div>

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

                    {
                      item.percent === 0
                        ? ''
                        : <div className={s.info_about_discounts}>
                          <span>&ndash;{item.percent}&#x25;</span>
                        </div>
                    }
                  </div>
              }

              <div className={s.wrapper_price_info}>
                <div className={item.old_price === 0 ? s.products_item_price : s.products_item_price + ' ' + s.products_item_price_color}><span>{item.price} &#8381;</span></div>
                {
                  item.old_price === 0
                    ? ''
                    : <div className={s.products_item_old_price}><span>{item.old_price} &#8381;</span></div>
                }

              </div>
              {
                item.click_to_link || Math.abs(new Date().getTime() - new Date(item.create_at).getTime()) / (1000 * 3600 * 24) < 1
                  ? <div className="goods_info_product_bonus">

                    {
                      item.click_to_link > 4
                      && <div className="bestseller_info"><span>Бестселлер</span></div>

                    }


                    {
                      Math.abs(new Date().getTime() - new Date(item.create_at).getTime()) / (1000 * 3600 * 24) < 1
                      && <div className='device_about_time'>
                        <span>Новинка</span>
                      </div>



                    }
                  </div>
                  : ''
              }


              <div className={s.products_item_name}><span>{item.device_name}</span></div>
              {
                item.product_availability
                  ? <a href={item.link_to_vk} target='_blank' onClick={() => changeRatingLinkCount(item.id, item.click_to_link)} className={s.products_item_btn}><span>Написать</span></a>
                  : <div className={s.products_is_out + ' ' + 'product_is_out'}>
                    <span>Товар закончился</span>
                  </div>
              }



            </a>

          ))
          : !popularGoods.length
            && <div className={s.products_cancel_img}>

            <img src={cancel} alt="" />
          </div>
        }

      </div>

    </div>
  )
}
