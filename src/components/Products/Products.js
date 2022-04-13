import React from 'react'
import s from './Products.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand, getDevices, getTypes, updateRatign, updateRatignLink } from '../../http/deviceApi'
import { setPopularBrands, setRecommendBrands } from '../../redux/reducers/brand-reducer'
import cancel from '../../assets/images/icons/cancel.svg'
import BestsellerProducts from './BestsellerProducts/BestsellerProducts'
import RecommendBrands from './RecommendBrands/RecommendBrands'
import PopularCategory from './PopularCategory/PopularCategory'
import PopularGoods from './PopularGoods/PopularGoods'
import { addDevices, setBestsellerDevice, setLoaded, setPopularDevice } from '../../redux/reducers/devices-reducer'
import Preloader from '../../assets/loader/Preloader'
import NewProducts from './NewProducts/NewProducts'



export default function Products() {

  const dispatch = useDispatch()

  let { items, bestsellerDevice, popularGoods, popularBrands, recommendBrands } = useSelector(({ devices, brands }) => {
    return {
      items: devices.items,
      bestsellerDevice: devices.bestsellerDevice,
      popularGoods: devices.popularDevice,
      popularBrands: brands.popularBrands,
      recommendBrands: brands.recommendBrands
    }
  })

  React.useEffect(() => {

    getDevices(null, null, null, 1, 24, 0, null, false)
      .then(({ data }) => dispatch(setPopularDevice(data)))
      .catch(err => console.error(err))

    getDevices(null, null, null, 1, 24, 0, true, false)
      .then(({ data }) => dispatch(setBestsellerDevice(data)))
      .catch(err => console.error(err))

    getTypes(null, 'rating')
      .then(({ data }) => dispatch(setPopularBrands(data)))
      .catch(err => console.error(err))

    getAllBrand(null, 'rating')
      .then(({ data }) => dispatch(setRecommendBrands(data)))
      .catch(err => console.error(err))

    getDevices(null, null, null, 1, 24, 0, true, true)
      .then(({ data }) => dispatch(addDevices(data)))
      .catch(err => console.error(err))
  }, [])


  const changeRatingItem = (id, rating) => {


    updateRatign(id, rating += 1)
      .catch(err => console.error(err))
  }

  const changeRatingLinkCount = (id, click_to_link) => {

    updateRatignLink(id, click_to_link += 1)
      .catch(err => console.error(err))

  }

  return (
    <section className={s.products}>
      <div className="container">
        <div className={s.products_row}>


          <div className={s.products_columns}>
            <div className={s.products_body}>
              {
                popularBrands.length || bestsellerDevice.length || recommendBrands.length || popularGoods.length
                  ? <div>

                    <PopularCategory
                      popularBrands={popularBrands}
                      cancel={cancel}
                    />
                    <NewProducts
                      items={items}
                      cancel={cancel}
                      changeRatingItem={changeRatingItem}
                    />
                    <BestsellerProducts
                      bestsellerDevice={bestsellerDevice}
                      cancel={cancel}
                      changeRatingLinkCount={changeRatingLinkCount}
                      changeRatingItem={changeRatingItem}
                    />

                    <RecommendBrands
                      recommendBrands={recommendBrands}
                      cancel={cancel}
                    />
                    <PopularGoods
                      popularGoods={popularGoods}
                      cancel={cancel}
                      changeRatingLinkCount={changeRatingLinkCount}
                      changeRatingItem={changeRatingItem}
                    />
                  </div>
                  : <Preloader />
              }



            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
