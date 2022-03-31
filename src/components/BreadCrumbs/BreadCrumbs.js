import React from 'react'
import s from './BreadCrumbs.module.css'
import { useLocation } from 'react-router';
import { setBreadCrumbs } from '../../redux/reducers/shop-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getOneDevice } from '../../http/deviceApi'


 function BreadCrumbs() {

  const location = useLocation()
  const dispatch = useDispatch()


  const { breadCrumbs } = useSelector(({ shop }) => {
    return {
      breadCrumbs: shop.breadCrumbs
    }
  })


  let breadCrumbsItems = []

  React.useEffect(() => {
   
    getbreadCrumbsItem()

  }, [])

  const getbreadCrumbsItem = () => {
    let currentUrl = location.pathname
    currentUrl = currentUrl.split('/').slice(1)


    currentUrl = currentUrl.map((n, i, a) => a.slice(0, i + 1).join('/'))


    breadCrumbsItems.push({
      title: 'Главная',
      path: '/'
    })


    currentUrl.map((item, i, arr) => {

      breadCrumbsItems.push(
        {
          title: item,
          path: arr[i] === 'category' ? '/all_category' : '/' + arr[i]
        }
      )
    })
    if (location.pathname.includes('device')) {
      let deviceNum = (location.pathname.match(/\d+/))[0]

      breadCrumbsItems = breadCrumbsItems.filter(item => !item.title.includes('device'))
      getOneDevice(deviceNum)
        .then(({ data }) => (
          breadCrumbsItems.push({
            title: data.device_name,
            path: 'device/' + data.id
          })
        ))


    }
    breadCrumbsItems.map(item => {
      let arr = Object.values(item)[0].split('/')
      item.title = arr[arr.length - 1]

      switch (item.title) {
        case 'shop':
          item.title = 'Все товары'
          break;
        case 'category':
          item.title = 'Каталог'
          break;
        case 'service':
          item.title = 'Услуги'
          break;

        default:
          break;
      }

    })


    dispatch(setBreadCrumbs(breadCrumbsItems))
  }

  return (
    <div className={s.bread_crumbs}>
      <ul className={s.bread_crumbs_menu}>
        {breadCrumbs.map(item => (
          <li key={item.title} className={s.bread_crumbs_item} >
            <a href={item.path} className={s.bread_crumbs_link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(BreadCrumbs)
