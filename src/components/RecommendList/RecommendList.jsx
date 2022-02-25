import React from 'react'
import { updateRatign } from '../../http/deviceApi'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Preloader from '../../assets/loader/Preloader';
// import 'swiper/swiper-react.css';


export default function RecommendList({ recommended, changeRatingLinkCount }) {

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
                    spaceBetween: 7,
                  },
                  370: {
                    slidesPerView: 2.6,
                  },
                  425: {
                    slidesPerView: 3.2,
                    // spaceBetween: 0,
                  },
                  732: {
                    slidesPerView: 4.5,
                    // spaceBetween: 40,
                  },
                  1023: {
                    slidesPerView: 5.5,
                    // spaceBetween: 0,
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
                              : <div className="goods_item_img ibg">

                                <img src={item.img} alt="" />

                              </div>
                          }
                          <div className="goods_item_many_content">
                            <div className="info_price_recommend">

                              <div className="goods_item_price"><span>{item.price} &#8381;</span></div>
                              {
                                item.old_price === 0
                                  ? ''
                                  : <div className="goods_item_old_price"><span>{item.old_price} &#8381;</span></div>
                              }

                            </div>
                            {
                              item.click_to_link >= 1
                                ? <div className="bestseller_info goods_item_bestseller_info"><span>Бестселлер</span></div>
                                : ''
                            }
                            <div className="goods_item_title"><span>{item.device_name}</span></div>
                          </div>

                          {/* {
                            item.product_availability
                              ? <div className='goods_item_shell'>
                                <a href="https://vk.com/id520073022" target={"_blank"} className='goods_item_btn' onClick={() => changeRatingLinkCount(item.id, item.click_to_link)}>Написать</a>
                              </div>
                              : <div className='product_is_out'>
                                Товар закончился
                              </div>

                          } */}
                        </a>
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>

            </div>
          </div>
          : recommended.length === 0
          ? ''
          : <Preloader />
      }
    </div>
  )
}
