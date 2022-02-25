import React from 'react';
import heart from '../../../assets/images/icons/heart.svg'
import favorite_heart from '../../../assets/images/icons/favorite-heart.svg'
import { Link, useLocation } from 'react-router-dom';

import s from '../Goods.module.css'
import { updateRatign } from '../../../http/deviceApi';

import '../../../App.css'


const GoodsList = React.memo(function GoodsList({ device, favorites, displayType, changeRatingLinkCount }) {

  // console.log(device.create_at.split('T')[0])
  const location = useLocation()


  // var date1 = new Date("7/11/2010");
  // var date2 = new Date("12/12/2010");
  // var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  // alert(diffDays);
  // const [myFavorites, setMyFavorites] = React.useState(false)
  // const [myFavoritesArr, setMyFavoritesArr] = React.useState([])



  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => { })
      .catch(err => console.error(err))

  }
  // function getCartData() {
  //   return JSON.parse(localStorage.getItem('favorites'));
  // }

  // function setCartData(o) {
  //   localStorage.setItem('favorites', JSON.stringify(o));
  //   return false;
  // }

  // function addToFavorite(device) {

  //   let cartData = getCartData() || {}

  //   let itemId = device.id

  //   if (cartData.hasOwnProperty(itemId) && cartData[itemId] !== null) {
  //     cartData[itemId] = null
  //   } else {
  //     cartData[itemId] = [device];
  //   }

  //   setCartData(cartData)


  //   setMyFavorites(!myFavorites)
  // }



  return (


    <div key={device.id} className={displayType ? s.goods_content_columns + ' ' + s.goods_columns_square_mod : s.goods_content_columns}>

      <a href={location.pathname + '/device/' + device.id} className={s.goods_content_item} onClick={() => changeRatingItem(device.id, device.rating)}>

        <div className={s.goods_content_img_bg}>
          {
            Math.abs(new Date().getTime() - new Date(device.create_at).getTime()) / (1000 * 3600 * 24) < 1
              ? <div className={s.device_about_time}>
                <span>Новинка</span>
              </div>
              : ''
          }
          {
            device.img === null
              ? <div className={s.goods_content_img + ' ' + s.goods_content_cancel + ' ' + 'ibg'}></div>
              : <div className={s.goods_content_img + ' ' + 'ibg'} >
                <img src={device.img} alt="" />
              </div>
          }

          {
            device.percent === 0
              ? ''
              : <div className={s.goods_info_about_disconts}>
                <span>&ndash;{device.percent}&#x25;</span>
              </div>
          }
          {/* <div className={s.goods_info_about_disconts}>
            <span>-{device.percent}&#x25;</span>
          </div> */}
        </div>


        <div className={s.goods_many_info_item}>
          <div className={s.goods_many_info_price}>

            <div className={device.old_price === 0 ? s.goods_content_price : s.goods_content_price + ' ' + s.goods_content_price_color}><span>{device.price} &#8381;</span></div>
            {
              device.old_price === 0
                ? ''
                : <div className={s.goods_content_old_price}><span>{device.old_price} &#8381;</span></div>
            }

          </div>
          {
            device.click_to_link >= 1
            ? <div className="bestseller_info"><span>Бестселлер</span></div>
            : ''
          }
          <div className={s.goods_content_title}>{device.device_name}</div>
        </div>
        {/* <div className={s.goods_content_info}>

            {
              device.description !== ''
                ? device.description
                : <div> По данному товару нет никакой информации &#128532;</div>

            }
          </div> */}
        {
          device.product_availability
            ? <div className={s.goods_content_shell}>
              <a href="https://vk.com/id520073022" target={"_blank"} className={s.goods_content_link} onClick={() => changeRatingLinkCount(device.id, device.click_to_link)}>Написать</a>
            </div>
            : <div className='product_is_out'>
              Товар закончился
            </div>

        }



      </a>



    </div>





  )
})

export default GoodsList;

{
  // favorites.map(item => {
  //   Object.entries(item)
  //     .map(list => {
  //       if (list[0] === device.id && list[1] !== null) {
  //         <div className={s.favorite_icon} onClick={() => addToFavorite(device)}>
  //           <img src={favorite_heart} alt="" />
  //         </div>
  //       }
  //     })
  // })

}
{/* <div className={s.favorite_icon} onClick={() => addToFavorite(device)}>
  <img src={myFavorites ? favorite_heart : heart} alt="" />
</div> */}