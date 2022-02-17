import React from 'react'
import { updateRatign } from '../../http/deviceApi'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import 'swiper/swiper-react.css';


export default function RecommendList({ recommended }) {

  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => console.log(data))

  }

  return (
    <div>
      {
        recommended.length
          ? <div className="recommended_goods">
            <p className="recommended_goods_title">Рекомендуем также</p>
            <div className="recommended_goods_row">
              <Swiper
               
                slidesPerView={5}
                spaceBetween={30}
                watchOverflow={true}
                breakpoints={{
                  320: {
                    slidesPerView: 2.3, 
                    spaceBetween: 30,
                  },
                  370: {
                    slidesPerView: 2.5, 
                  
                  },
                  425: {
                    slidesPerView: 3.5,  
                    spaceBetween: 20,
                  },
                  732: {
                    slidesPerView: 4.5,
                    // spaceBetween: 40,
                  },
                  1023: {
                    slidesPerView: 5.5,
                    // spaceBetween: 50,
                  },
                }}
              >

                {
                  recommended.map(item => (
                    <SwiperSlide>

                      <div className="recommended_goods_columns" key={item.device_name}>
                        <a href={item.id} className="recommended_goods_item" onClick={() => changeRatingItem(item.id, item.rating)}>
                          {
                            item.img === null
                              ? <div className="goods_item_img devicePage_img_cancel ibg"></div>
                              : <div className="goods_item_img ibg"><img src={item.img} alt="" /></div>
                          }


                          <div className="goods_item_price">{item.price} &#8381;</div>
                          <div className="goods_item_title">{item.device_name}</div>
                          {/* <a href="#" className='goods_item_btn'>Написать</a> */}
                        </a>
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>

            </div>
          </div>
          : ''
      }
    </div>
  )
}
