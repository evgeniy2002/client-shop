import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


import s from '../Products.module.css'



const NewProducts = ({ items, cancel, changeRatingItem }) => {
  return (
    <div className={s.products_new_header}>
      <div className={s.products_body_title}><span>Новые товары</span></div>

      <div className={s.products_new_row}>
        {
          items.length
            ? <Swiper
              spaceBetween={20}
              watchOverflow={true}
              breakpoints={{
                320: {
                  slidesPerView: 2.2,
                  spaceBetween: 10
                },
                425: {
                  slidesPerView: 2.8,
                  spaceBetween: 15
                },
                732: {
                  slidesPerView: 4.5,
                  spaceBetween: 10
                },
                1023: {
                  slidesPerView: 5.5,
                }
              }}
              className="NewProductsSlider"
            >
              {
                items.map(device => (

                  <SwiperSlide key={device.device_name}>

                    <a href={`/device/${device.id}`} className={s.products_new_slider}  onClick={() => changeRatingItem(device.id, device.rating)}>


                      <div className={s.products_wrapper_new_img}>

                        <div className={s.products_new_img + ' ' + 'ibg'}>
                          <img src={device.img} alt="" />
                        </div>

                      </div>
                      <div className={s.products_slider_info}>
                        <div className={s.products_slider_price}><span>{device.price} &#8381;</span></div>
                        <div className={s.products_slider_name}><span>{device.device_name}</span></div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))
              }

            </Swiper>
            : <div className={s.products_new_cancel_img}>

              <img src={cancel} alt="" />
            </div>
        }



        {/* {
          items.length
            ? <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="ProductsSwiper"
            >
              {
                items.map(device => (
                  <>
                    {
                      Math.abs(new Date().getTime() - new Date(device.create_at).getTime()) / (1000 * 3600 * 24) < 1
                        ? <SwiperSlide>
                          <a href="#" className={s.products_slider_item}>
                            <div className={s.products_slider_img + ' ' + 'ibg'}>
                              <img src={device.img} alt="" />
                            </div>
                            <div className={s.products_slider_info}>

                              <div className={s.products_slider_price}><span>{device.price} &#8381;</span></div>
                              <div className={s.products_slider_name}><span>{device.device_name}</span></div>
                            </div>
                          </a>
                        </SwiperSlide>
                        : null
                    }

                  </>
                ))
                // Math.abs(new Date().getTime() - new Date(device.create_at).getTime()) / (1000 * 3600 * 24) < 1
              }

            </Swiper>
            : <div className={s.products_cancel_img}>

              <img src={cancel} alt="" />
            </div>
        } */}


      </div>
    </div>
  )
}

export default NewProducts