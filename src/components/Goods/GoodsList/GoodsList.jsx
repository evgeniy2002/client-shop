import React from 'react';

import { useLocation } from 'react-router-dom';

import s from '../Goods.module.css'
import { updateRatign } from '../../../http/deviceApi';

import '../../../App.css'


const GoodsList = React.memo(function GoodsList({ device, displayType, changeRatingLinkCount }) {

  const location = useLocation()


  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .catch(err => console.error(err))

  }


  return (


    <div key={device.id} className={displayType ? s.goods_content_columns + ' ' + s.goods_columns_square_mod : s.goods_content_columns}>

      <a href={location.pathname + '/device/' + device.id} className={s.goods_content_item} onClick={() => changeRatingItem(device.id, device.rating)}>

        <div className={s.goods_content_img_bg}>

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
          <div className='goods_info_product_bonus goods_list_info_bonus'>

            {
              device.click_to_link >= 1
              && <div className="bestseller_info"><span>Бестселлер</span></div>

            }
            {
              Math.abs(new Date().getTime() - new Date(device.create_at).getTime()) / (1000 * 3600 * 24) < 1
              && <div className='device_about_time'>
                <span>Новинка</span>
              </div>

            }
          </div>
          <div className={s.goods_content_title}><span>{device.device_name}</span></div>
        </div>

        {
          device.product_availability
            ? <div className={s.goods_content_shell}>
              <a href={device.link_to_vk} target={"_blank"} className={s.goods_content_link} onClick={() => changeRatingLinkCount(device.id, device.click_to_link)}>Написать</a>
            </div>
            : <div className='product_is_out'>
              <span>Товар закончился</span>
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