import React from 'react'
import { useSelector } from 'react-redux'
import Preloader from '../assets/loader/Preloader'
import style from '../components/Goods/Brands/Brands.module.css'
import s from '../components/Goods/Goods.module.css'
import ProductNotFound from '../components/ProductNotFound/ProductNotFound'
import { updateRatignType } from '../http/deviceApi'

export default function AllCategory() {

  let { typeCategory } = useSelector(({ types }) => {
    return {
      typeCategory: types.typesArr,
    }

  })

  const changeRatingType = React.useCallback((id, rating) => {


    updateRatignType(id, rating += 1)
      .then(data => {})
      .catch(err => console.error(err))
  })

  return (
    <section className={s.goods}>
      <div className='container'>
        <div className={s.current_goods_title + ' ' + s.goods_category_title}><span>Каталог</span></div>
        <div className={s.goods_category_content}>
          <div className={s.goods_many_content}>

            <div className={s.goods_content_row}>

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
      </div>
    </section>
  )
}
