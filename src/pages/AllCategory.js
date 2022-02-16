import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from '../assets/loader/Preloader'
import style from '../components/Goods/Brands/Brands.module.css'
import ProductNotFound from '../components/ProductNotFound/ProductNotFound'
import { getDevices, updateRatign, updateRatignType } from '../http/deviceApi'
import { addDevices } from '../redux/reducers/devices-reducer'

import style_p from '../components/Products/Products.module.css'
import s from '../components/Goods/Goods.module.css'

export default function AllCategory() {

  const dispatch = useDispatch()

  let { typeCategory, devices } = useSelector(({ types, devices }) => {
    return {
      typeCategory: types.typesArr,
      devices: devices.items
    }

  })

  const changeRatingType = React.useCallback((id, rating) => {


    updateRatignType(id, rating += 1)
      .then(data => { })
      .catch(err => console.error(err))
  })

  React.useEffect(() => {
    getDevices()
      .then(({ data }) => dispatch(addDevices(data)))
      .catch(err => console.error(err))
  }, [])


  const changeRatingItem = (id, rating) => {


    updateRatign(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  return (
    <section className={s.goods}>
      <div className='container'>
        <div className={s.current_goods_title + ' ' + s.goods_category_title}><span>Каталог</span></div>
        <div className={s.goods_category_content}>
          <div className={s.goods_many_content}>

            <div className={s.goods_content_row + ' ' + s.AllCategory_content_row}>

              {typeCategory.length
                ? typeCategory.map(type => (

                  <div key={type.id} className={style.brand_columns_category}>
                    <a href={'category/' + type.type_name} className={style.brand_item} onClick={changeRatingType(type.id, type.rating)}>
                      {
                        type.img === null
                          ? <div className={style.brand_item_img + ' ' + style.all_other_cancel + ' ' + 'ibg'}></div>
                          : <div className={style.brand_item_img + ' ' + 'ibg'}>
                            <img src={type.img} alt="" />
                          </div>
                      }


                    </a>
                    <div className={style.brand_item_title}>{type.type_name}</div>
                  </div>
                ))

                : <Preloader />
              }

            </div>
          </div>
        </div>


        {/* <div className={s.current_goods_title + ' ' + s.goods_category_all_title}><span>Каталог всех товаров</span></div>
        <div className={s.goods_category_content}>
          <div className={s.goods_many_content}>
            <div className={style_p.products_body_footer}>

              <div className={s.goods_content_row}>

                {devices.length
                  ? devices.map(item => (

                    <a key={item.id} href={"/device/" + item.id} className={style_p.products_header_item} onClick={() => changeRatingItem(item.id, item.rating)}>
                      {
                        item.img === null
                          ? <div className={style_p.products_item_img + ' ' + style_p.products_item_cancel + ' ' + 'ibg'}></div>
                          : <div className={style_p.products_item_img + ' ' + 'ibg'}>
                            <img src={item.img} alt="" />
                          </div>
                      }


                      <div className={style_p.products_item_price}><span>{item.price} &#8381;</span></div>
                      <div className={style_p.products_item_name}><span>{item.device_name}</span></div>
                    </a>
                  ))

                  : ''
                }

              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
