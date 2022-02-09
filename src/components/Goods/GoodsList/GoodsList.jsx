import React from 'react';
import heart from '../../../assets/images/icons/heart.svg'
import favorite_heart from '../../../assets/images/icons/favorite-heart.svg'
import { Link, useLocation } from 'react-router-dom';

import s from '../Goods.module.css'
import { updateRatign } from '../../../http/deviceApi';

function GoodsList({device}) {


  const location = useLocation()


  const [myFavorites, setMyFavorites] = React.useState(false)


  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => {})
      .catch(err => console.error(err))

  }


  const setChangeFavorites = () => {
    setMyFavorites(!myFavorites)
  }

  return (
    
      <div key={device.id} className={s.goods_content_columns + ' ' + s.novelty}>


        <div className={s.goods_content_item} onClick={() => changeRatingItem(device.id, device.rating)}>

          {
            device.img === null
              ? <a href={location.pathname + '/device/' + device.id} className={s.goods_content_img + ' ' + s.goods_content_cancel + ' ' + 'ibg'}></a>
              : <a className={s.goods_content_img + ' ' + 'ibg'} href={location.pathname + '/device/' + device.id}>
                <img src={device.img} alt="" />
              </a>
          }

          <a href={location.pathname + '/device/' + device.id} className={s.goods_content_description}>

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
          </a>
          <div className={s.favorite_icon} onClick={setChangeFavorites}>
            <img src={myFavorites ? favorite_heart : heart} alt="" />
          </div>
        </div>



      </div>

  )
}

export default GoodsList;
