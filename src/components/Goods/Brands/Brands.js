import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { setPunelBrandsThunkCreator } from '../../../redux/reducers/brand-reducer'
import BreadCrumbs from '../../BreadCrumbs/BreadCrumbs'
import filter from '../../../assets/images/icons/edit.png'
import s from '../Goods.module.css'
import style from './Brands.module.css'
import Preloader from '../../../assets/loader/Preloader'


export default function Brands({ brandsArr, currentCrumbs, isLoaded }) {

  const dispatch = useDispatch()

  const params = useParams()

  const [visibleFilter, setVisibleFilter] = React.useState(false)

  const { panelBrands } = useSelector(({ brands }) => {
    return {
      panelBrands: brands.panelBrands
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


  return (
    <section className={s.goods}>
      <div className="container">
        <div className={s.goods_info}>
          <BreadCrumbs />
          <div className={s.current_goods_title}><span>{currentCrumbs}</span></div>
          <div className={s.filter_img  + ' ' + s.filter_brand} onClick={handleFilterState}>
            <img src={filter} alt="" />
          </div>
        </div>


        {

          <div className={s.goods_content}>

            <div className={visibleFilter ? s.filter + ' ' + s.filter_active : s.filter}>
              <div className={s.filter_body_title}>Другие категории</div>
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

              <div className={s.brand_content_row}>

                {
                  isLoaded
                    ? <Preloader />
                    : brandsArr.map(brand => (
                      <div key={brand.brands_name} className={style.brand_other_columns}>
                        <a href={location.pathname + '/' + brand.brands_name} className={style.brand_other_item} >
                          {
                            brand.img === null
                              ? <div className={style.brand_other_img + ' ' + style.brand_other_cancel + ' ' + 'ibg'}> </div>
                              : <div className={style.brand_other_img + ' ' + 'ibg'}>
                                <img src={process.env.REACT_APP_API_URL + brand.img} alt="" />

                              </div>
                          }


                        </a>
                        <div className={style.brand_item_title}>{brand.brands_name}</div>
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

