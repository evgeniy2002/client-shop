import React from 'react'

import s from './Goods.module.css'
import SortPopap from './SortPopap/SortPopap';
import { useDispatch } from 'react-redux';
import { addDevices, setLoaded, setSortBy } from '../../redux/reducers/devices-reducer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import { getAllBrand, getDevices, updateRatignLink } from '../../http/deviceApi';
import Preloader from '../../assets/loader/Preloader';
import Paginate from '../Paginate';
import ProductNotFound from '../ProductNotFound/ProductNotFound';
import FilterBody from './FilterBody/FilterBody';
import GoodsList from './GoodsList/GoodsList';

import filter from '../../assets/images/icons/filter-icon.svg'
import menu from '../../assets/images/icons/menu-square.svg'
import menu_line from '../../assets/images/icons/menu-line.svg'

const sortItems = [
  { name: 'Популярные', type: 'rating', order: 'desc' },
  { name: 'Сначала дорогие', type: 'price', order: 'desc' },
  { name: 'Сначала дешевые', type: 'low_price', order: 'asc' },
  { name: 'Новинки', type: 'create_at', order: 'desc' }
]


export default function Goods({ deviceItems, currentCrumbs, params, isLoaded, getNoun, sortBy }) {


  const dispatch = useDispatch()

  const [lowerValue, setLowerValue] = React.useState(0)
  const [upperValue, setUpperValue] = React.useState(0)
  const [currentBrand, setCurrentBrand] = React.useState(null)
  const [maxPrice, setMaxPrice] = React.useState(0)
  const [onSetUiSlider, setUiSlider] = React.useState(null)
  const [visibleFilter, setVisibleFilter] = React.useState(false)
  const [showDateFromFilter, setDateFromFilter] = React.useState(false)
  const [filterChange, setFilterChange] = React.useState(false)

  const [displayType, setDisplayType] = React.useState(true)

  const body = document.querySelector('body')

  const rangeValue = (value) => {

    for (let i = 0; i < value.length; i++) {
      i === 0
        ? setLowerValue(value[0].replace(/\.\d+/g, ''))
        : setUpperValue(value[1].replace(/\.\d+/g, ''))

    }

  }



  React.useEffect(() => {
    dispatch(setLoaded(true))
    getAllBrand()
      .then(({ data }) => {
        let device = data.find(item => item.brands_name === params.type)

        setCurrentBrand(device.id)

        getDevices(device.id, null, null, 1, 40, 0, null, false)
          .then(({ data }) => {
            dispatch(addDevices(data))
          })

        getDevices(device.id, null, null, null, null, 1, null, false)
          .then(({ data }) => setMaxPrice(data[0].max))
          .catch(err => console.error(err))

        dispatch(setLoaded(false))
      })

  }, [])


  React.useEffect(() => {
    if (window.matchMedia("(min-width: 769px)").matches) { 
      filterByPrice(lowerValue, upperValue)
    }
  }, [onSetUiSlider, sortBy.type])

  React.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) { 
      filterByPrice(lowerValue, upperValue)
    }
  }, [sortBy.type, currentBrand])

  React.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches && showDateFromFilter) {

      filterByPrice(lowerValue, upperValue)
      setDateFromFilter(false)

    }

  }, [showDateFromFilter])


  const filterByPrice = (from, to) => {
    dispatch(setLoaded(true))
    getDevices(currentBrand, sortBy.type, sortBy.order, 1, 40, 0, null, false)
      .then(({ data }) => {
        let filter = data.filter(item => {
          if (item.price >= from && item.price <= to) {
            return item;
          }
        })
        dispatch(addDevices(filter))
        dispatch(setLoaded(false))
      })

  }



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

  const shopDateFilter = () => {
    setDateFromFilter(true)
    setVisibleFilter(false)
    body.classList.toggle('lock')
  }

  const changeStateFilter = () => {

    setFilterChange(!filterChange)

  }

  const changeDisplayType = () => {
    setDisplayType(!displayType)
  }

  const changeRatingLinkCount = (id, click_to_link) => {

    updateRatignLink(id, click_to_link += 1)
      .catch(err => console.error(err))

  }







  const memorizedBreadCrumbs = React.useMemo(() => <BreadCrumbs />)

  return (
    <section className={s.goods}>
      <div className="container">
        {memorizedBreadCrumbs}

        <div className={s.goods_info}>

          <h1 className={s.current_goods_title}><span>{currentCrumbs}</span></h1>

          <div className={s.current_goods_subtitle}><span>{deviceItems.length + ' ' + getNoun(deviceItems.length, 'товар', 'товара', 'товаров')}</span></div>
        </div>


        <div className={s.goods_content}>

          <div className={visibleFilter ? s.filter + ' ' + s.filter_active : s.filter}>

            <FilterBody

              maxPrice={maxPrice}
              setUiSlider={setUiSlider}
              lowerValue={lowerValue}
              upperValue={upperValue}
              shopDateFilter={shopDateFilter}
              closeFilter={closeFilter}
              rangeValue={rangeValue}
              changeStateFilter={changeStateFilter}

            />
          </div>
          <div className={s.goods_many_content}>
            {
              displayType
                ? <div className={s.menu_img} onClick={changeDisplayType}>
                  <img src={menu} alt="" />
                </div>
                : <div className={s.menu_img} onClick={changeDisplayType}>
                  <img src={menu_line} alt="" />
                </div>
            }

            <SortPopap
              onClickItem={setCurrentSortBy}
              activeSortBy={sortBy}
              items={sortItems}
            />
            <div className={s.filter_img + ' ' + s.filter_goods_img} onClick={handleFilterState}>
              <img src={filter} alt="" />
            </div>
            <div className={s.goods_content_row + ' ' + s.goods_content_row_devices}>
              {
                deviceItems.length
                  ? deviceItems.map(device => (
                    <GoodsList
                      key={device.device_name}
                      device={device}
                      displayType={displayType}
                      changeRatingLinkCount={changeRatingLinkCount}

                    />
                  ))
                  : isLoaded
                  && <Preloader />

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

