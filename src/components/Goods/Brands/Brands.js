import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { setPunelBrandsThunkCreator } from '../../../redux/reducers/brand-reducer'
import BreadCrumbs from '../../BreadCrumbs/BreadCrumbs'
import filter from '../../../assets/images/icons/menu-category.svg'
import s from '../Goods.module.css'
import style from './Brands.module.css'
import Preloader from '../../../assets/loader/Preloader'

import arrow from '../../../assets/images/icons/next-arrow.svg'
import { updateRatignBrand } from '../../../http/deviceApi'

export default function Brands({ brandsArr, currentCrumbs, isLoaded, generalCountGoods, getNoun }) {

  const dispatch = useDispatch()

  const params = useParams()

  const [visibleFilter, setVisibleFilter] = React.useState(false)

  const { panelBrands } = useSelector(({ brands, shop }) => {
    return {
      panelBrands: brands.panelBrands,
      breadCrumbs: shop.breadCrumbs
    }
  })


  const location = useLocation()

  React.useEffect(() => {
    dispatch(setPunelBrandsThunkCreator(params.brand))
  }, [])


  const handleFilterState = React.useCallback(() => {
    setVisibleFilter(!visibleFilter)
    document.body.classList.toggle('lock')
  })

  const closeFilter = React.useCallback(() => {
    setVisibleFilter(false)
    document.body.classList.toggle('lock')
  })


  const changeRatingBrand = (id, rating) => {

    updateRatignBrand(id, rating += 1)
      .catch(err => console.error(err))

  }

  return (
    <section className={s.goods}>
      <div className="container">
        <div className={s.goods_info}>
          <BreadCrumbs />

        </div>


        {

          <div className={s.goods_content}>

            <div className={visibleFilter ? s.filter + ' ' + s.filter_active : s.filter}>
              <div className={s.filter_body_title}>Категории</div>
              <div className={s.filter_close}>
                <button onClick={closeFilter}><span>Отмена</span></button>
              </div>
              {

                panelBrands.map(item => (

                  <div key={item.title} className={s.filter_content}>

                    <a href={'/category/' + item.title} className={s.filter_title}>{item.title}</a>
                    <ul className={s.filter_submenu}>{item.otherBrands.map(list => (
                      <li key={list.brands_name} className={s.filter_submenu_list}><a href={item.title + '/' + list.brands_name} className={s.filter_submenu_link}>{list.brands_name}</a></li>
                    ))}
                    </ul>
                  </div>
                ))

              }

            </div>

            <div className={s.brand_many_content}>
              <div className={s.brand_many_content_info}>

                <div className={s.current_goods_title}><span>{currentCrumbs}</span></div>
                <div className={s.current_goods_count_device}><span>{generalCountGoods + ' ' + getNoun(generalCountGoods, 'товар', 'товара', 'товаров')} </span></div>
              </div>

              <div className={s.filter_sub_modal} onClick={handleFilterState}>
                <div className={s.filter_sub_img}>
                  <img src={filter} alt="" />

                </div>
                <span>Категории</span>
                <div className={s.arrow_img} >
                  <img src={arrow} alt="" />

                </div>
              </div>

              <div className={s.brand_content_row}>

                {
                  isLoaded
                    ? <Preloader />
                    : brandsArr.map(brand => (
                      <div key={brand.brands_name} className={style.brand_other_sub_columns}>
                        <a href={location.pathname + '/' + brand.brands_name} className={style.brand_other_sub_item} onClick={() => changeRatingBrand(brand.id, brand.rating)}>
                          {
                            brand.img === null
                              ? <div className={style.brand_other_sub_img + ' ' + style.brand_other_sub_cancel + ' ' + 'ibg'}></div>
                              : <div className={style.brand_other_img_wrapper}>

                                <div className={style.brand_other_sub_img + ' ' + 'ibg'}>
                                  <img src={brand.img} alt="" />

                                </div>
                              </div>
                          }

                          <div className={style.brands_item_title}>{brand.brands_name}</div>
                        </a>
                      </div>
                     

                    ))

                }

              </div>
            </div>
          </div>
        }

      </div>
    </section>
  )
}

