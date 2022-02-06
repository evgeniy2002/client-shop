import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getAllBrand  } from '../http/deviceApi'
import Goods from '../components/Goods/Goods'
import { getDevices, getTypes } from '../http/deviceApi'
import { addDevices, setLoaded, setTotalCount } from '../redux/reducers/devices-reducer'
import { setBrands } from '../redux/reducers/brand-reducer'
import Brands from '../components/Goods/Brands/Brands'


export default function Shop() {

  const params = useParams()

  const dispatch = useDispatch()


  const [currentCrumbs, setCurrentCrumbs] = React.useState('')

  let { brandsArr, items, typeCategory, sortBy, breadCrumbs, lowerValue, upperValue, isLoaded, limit, page } = useSelector(({ brands, devices, types, shop }) => {
    return {
      brandsArr: brands.brandsArr,
      items: devices.items,
      typeCategory: types.typesArr,
      sortBy: devices.sortBy,
      breadCrumbs: shop.breadCrumbs,
      lowerValue: devices.lowerValue,
      upperValue: devices.upperValue,
      isLoaded: devices.isLoaded,
      limit: devices.limit,
      page: devices.page
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

    if (params.brand && !params.type) {
      dispatch(setLoaded(true))
      getTypes()
        .then(({ data }) => {
          let device = data.find(item => item.type_name === params.brand)

          getAllBrand(device.id)
            .then(({ data }) => dispatch(setBrands(data)))
            dispatch(setLoaded(false))
        })
        .catch(err => console.error(err))
    }

  }, [])




  React.useEffect(() => {
    if (params.type) {
      dispatch(setLoaded(true))
      getAllBrand()
        .then(({ data }) => {
          let device = data.find(item => item.brands_name === params.type)

          getDevices(device.id, sortBy.type, sortBy.order, 1, 1000, 0, null, null)
            .then(({ data }) => {
              dispatch(addDevices(data))
              dispatch(setTotalCount(data.length))
              
            })
            .catch(err => console.error(err))
            
            dispatch(setLoaded(false))

        })
        .catch(err => console.error(err))
    }
  }, [sortBy.type])
  
  
  // React.useEffect(() => {
  //   if (params.type) {
  //   getBrand()
  //       .then(({ data }) => {
  //         let device = data.filter(item => item.brands_name === params.type)

  //         getDevices(device[0].id, 'rating', 'desc', 1, 1000, 0, null, null)
  //           .then(({ data }) => {



  //           })

  //       })

  //     }
  // },[])

  return (
    <div className="shop_content">
      {
        !params.type
          ? <Brands brandsArr={brandsArr} typeCategory={typeCategory} currentCrumbs={currentCrumbs} isLoaded={isLoaded} />
          : <Goods
            currentCrumbs={currentCrumbs}
            deviceItems={items}
            lowerValue={lowerValue}
            upperValue={upperValue}
            isLoaded={isLoaded}
            params={params}
          />
      }

    </div>
  )
}