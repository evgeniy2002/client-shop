import React from 'react'

import s from './Goods.module.css'
import SortPopap from './SortPopap/SortPopap';
import filter from '../../assets/images/icons/edit.png'
import { useDispatch, useSelector } from 'react-redux';
import { addDevices, setLoaded, setSortBy } from '../../redux/reducers/devices-reducer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import { useLocation } from 'react-router';
import { getAllBrand, getDevices, updateRatign } from '../../http/deviceApi';
import Preloader from '../../assets/loader/Preloader';
import Paginate from '../Paginate';
import ProductNotFound from '../ProductNotFound/ProductNotFound';
import FilterBody from './FilterBody/FilterBody';
import { Link } from 'react-router-dom';

const sortItems = [
  { name: 'По популярности', type: 'rating', order: 'desc' },
  { name: 'Сначала дорогие', type: 'price', order: 'desc' },
  { name: 'Сначала дешевые', type: 'low_price', order: 'asc' },
  { name: 'По времени', type: 'create_at', order: 'desc' },
  { name: 'За последние 24 часа', type: 'in_24_hour', order: 'asc' },
]


export default function Goods({ deviceItems, currentCrumbs, params, isLoaded }) {

  const location = useLocation()
  const dispatch = useDispatch()

  const { sortBy } = useSelector(({ devices }) => {
    return {
      sortBy: devices.sortBy,

    }
  })

  const [lowerValue, setLowerValue] = React.useState(0)
  const [upperValue, setUpperValue] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(0)
  const [visibleFilter, setVisibleFilter] = React.useState(false)
  const [showDateFromFilter, setDateFromFilter] = React.useState(false)
  const [filterChange, setFilterChange] = React.useState(false)


  const body = document.querySelector('body')

  const rangeValue = React.useCallback((value) => {

    for (let i = 0; i < value.length; i++) {
      i === 0
        ? setLowerValue(value[0].replace(/\.\d+/g, ''))
        : setUpperValue(value[1].replace(/\.\d+/g, ''))

    }

  }, [])



  React.useEffect(() => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      getDevicesFromFilter(0, lowerValue, upperValue)
    }

  }, [lowerValue, upperValue])

  React.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches && showDateFromFilter) {

      getDevicesFromFilter(0, lowerValue, upperValue)
      setDateFromFilter(false)

    }

  }, [showDateFromFilter])



  React.useEffect(() => {
    getDevicesFromFilter(1, null, null)
  }, [])



  const handleFilterState = React.useCallback(() => {
    setVisibleFilter(!visibleFilter)
    body.classList.toggle('lock')
  })

  const closeFilter = React.useCallback(() => {
    setVisibleFilter(false)
    body.classList.toggle('lock')
  })

  const setCurrentSortBy = React.useCallback((type) => {
    dispatch(setSortBy({ type: type.type, order: type.order }))
  })

  const getDevicesFromFilter = (selectPrice, lowVal, UpperVal) => {
    dispatch(setLoaded(true))
    getAllBrand()
      .then(({ data }) => {
        let device = data.find(item => item.brands_name === params.type)

        selectPrice === 1
          ? getDevices(device.id, sortBy.type, sortBy.order, null, null, selectPrice, lowVal, UpperVal)
            .then(({ data }) => setMaxPrice(data[0].max))
            .catch(err => console.error(err))
          : getDevices(device.id, sortBy.type, sortBy.order, null, null, selectPrice, lowVal, UpperVal)
            .then(({ data }) => dispatch(addDevices(data)))
            .catch(err => console.error(err))


        dispatch(setLoaded(false))
      })
      .catch(err => console.error(err))
  }

  const shopDateFilter = () => {
    setDateFromFilter(true)
    setVisibleFilter(false)
    body.classList.toggle('lock')
  }

  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))

  }

  const changeStateFilter = () => {

    setFilterChange(!filterChange)

  }

  const memorizedBreadCrumbs = React.useMemo(() => <BreadCrumbs />)

  return (
    <section className={s.goods}>
      <div className="container">
        <div className={s.goods_info}>
          {memorizedBreadCrumbs}

          <div className={s.current_goods_title}><span>{currentCrumbs}</span></div>
          <div className={s.current_goods_subtitle}>товаров &nbsp;<span>{deviceItems.length}</span></div>
        </div>


        <div className={s.goods_content}>

          <div className={visibleFilter ? s.filter + ' ' + s.filter_active : s.filter}>

            <FilterBody

              maxPrice={maxPrice}
              lowerValue={lowerValue}
              upperValue={upperValue}
              shopDateFilter={shopDateFilter}
              closeFilter={closeFilter}
              rangeValue={rangeValue}
              changeStateFilter={changeStateFilter}

            />
          </div>
          <div className={s.goods_many_content}>
            <SortPopap
              onClickItem={setCurrentSortBy}
              activeSortBy={sortBy}
              items={sortItems}
            />
            <div className={s.filter_img + ' ' + s.filter_goods_img} onClick={handleFilterState}>
              <img src={filter} alt="" />
            </div>
            <div className={s.goods_content_row}>

              {
                isLoaded
                  ? <Preloader />
                  : deviceItems.map(device => (
                    <div key={device.id} className={s.goods_content_columns + ' ' + s.novelty}>


                      <a href={location.pathname + '/device/' + device.id} className={s.goods_content_item} onClick={() => changeRatingItem(device.id, device.rating)}>

                        {
                          device.img === null
                            ? <div className={s.goods_content_img + ' ' + s.goods_content_cancel + ' ' + 'ibg'}></div>
                            : <div className={s.goods_content_img + ' ' + 'ibg'}>
                              <img src={device.img} alt="" />
                            </div>
                        }

                        <div className={s.goods_content_description}>

                          <div className={s.goods_content_title}>{device.device_name}</div>
                          <div className={s.goods_content_info}>

                            {
                              device.description !== ''
                                ? device.description
                                : <div> По данному товару нет никакой информации &#128532;</div>

                            }
                          </div>
                          <div className={s.goods_content_price}>{device.price}&#8381;</div>
                          <div className={s.goods_content_shell}>
                            <Link to="#" className={s.goods_content_link}>Написать продавцу</Link>
                            {/* <a href='#' className={s.goods_content_link}>Написать продавцу</a> */}
                          </div>
                        </div>

                      </a>



                    </div>
                  ))

              }
              {

                !deviceItems.length && filterChange
                && <ProductNotFound />


              }

            </div>
            {/* <Paginate /> */}
          </div>
        </div>

      </div>
    </section>
  )
}

