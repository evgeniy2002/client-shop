import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getAllBrand } from '../http/deviceApi'
import Goods from '../components/Goods/Goods'
import { getDevices, getTypes } from '../http/deviceApi'
import { setLoaded } from '../redux/reducers/devices-reducer'
import { setBrands } from '../redux/reducers/brand-reducer'
import Brands from '../components/Goods/Brands/Brands'


export default function Shop() {

  const params = useParams()

  const dispatch = useDispatch()

  const [generalCountGoods, setgeneralCountGoods] = React.useState(0)
  const [currentCrumbs, setCurrentCrumbs] = React.useState('')

  let { brandsArr, items, sortBy, breadCrumbs, isLoaded} = useSelector(({ brands, devices, shop }) => {
    return {
      brandsArr: brands.brandsArr,
      items: devices.items,
      sortBy: devices.sortBy,
      breadCrumbs: shop.breadCrumbs,
      isLoaded: devices.isLoaded

    }

  })

  React.useEffect(() => {
    changeBreadCrumb()
  })

  const changeBreadCrumb = React.useCallback(() => {
    let val = breadCrumbs.length
      ? breadCrumbs[breadCrumbs.length - 1].title
      : ''

    setCurrentCrumbs(val)
  })


  React.useEffect(() => {

    if (params.brand) {
      dispatch(setLoaded(true))
      getTypes()
        .then(({ data }) => {
          let device = data.find(item => item.type_name === params.brand)

          getAllBrand(device.id)
            .then(({ data }) => {
              dispatch(setBrands(data))

              let findBrandIndex = data.map(item => Number(item.id))

              getDevices()
                .then(({ data }) => {

                  let devicesGetId = data.map(item => item.brand_id)

                  setgeneralCountGoods(devicesGetId.filter(item => findBrandIndex.indexOf(item) > -1).length)
                })

            })
          dispatch(setLoaded(false))
        })
        .catch(err => console.error(err))
    }

  }, [])


  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  return (
    <div className="shop_content">
      {
        !params.type
          ? <Brands
            brandsArr={brandsArr}
            currentCrumbs={currentCrumbs}
            isLoaded={isLoaded}
            generalCountGoods={generalCountGoods}
            getNoun={getNoun}
            />
            : <Goods
            currentCrumbs={currentCrumbs}
            deviceItems={items}
            isLoaded={isLoaded}
            params={params}
            getNoun={getNoun}
            sortBy={sortBy}
            />
          }

    </div>
  )
}