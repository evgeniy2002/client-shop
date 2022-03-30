import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { EffectCards } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


import s from '../Products.module.css'



const NewProducts = () => {
  return (
    <div className={s.products_new_header}>
      <div className={s.products_body_title}><span>Новые товары</span></div>

      <div className={s.products_new_row}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="ProductsSwiper"
        >
          <SwiperSlide>
            <a href="#" className={s.products_slider_item}>
              <div className={s.products_slider_img + ' ' + 'ibg'}>
                <img src='https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png' alt="" />
              </div>
              <div className={s.products_slider_info}>

                <div className={s.products_slider_price}><span>100&#8381;</span></div>
                <div className={s.products_slider_name}><span>Coca Cola</span></div>
              </div>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#" className={s.products_slider_item}>
              <div className={s.products_slider_img + ' ' + 'ibg'}>
                <img src='https://shop-storage.storage.yandexcloud.net/images/75f92f8e396babe8e752c7eb2f044f31.png' alt="" />
              </div>
              <div className={s.products_slider_info}>

                <div className={s.products_slider_price}><span>100&#8381;</span></div>
                <div className={s.products_slider_name}><span>Test NameTest NameTest NameTest NameTest NameTest NameTest Name</span></div>

              </div>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#" className={s.products_slider_item}>
              <div className={s.products_slider_img + ' ' + 'ibg'}>
                <img src='https://shop-storage.storage.yandexcloud.net/images/c9f9a39419a4c33974d903ec6d8fcc4e.jpg' alt="" />
              </div>

              <div className={s.products_slider_name}><span>Test Name</span></div>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#" className={s.products_slider_item}>
              <div className={s.products_slider_img + ' ' + 'ibg'}>
                <img src='https://shop-storage.storage.yandexcloud.net/images/33554f57006b707c0e13712bb1338203.webp' alt="" />
              </div>

              <div className={s.products_slider_name}><span>Test Name</span></div>
            </a>
          </SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/75f92f8e396babe8e752c7eb2f044f31.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://shop-storage.storage.yandexcloud.net/images/8c092b9be5c1b9058d5bda48d14029fc.png" alt="" /></SwiperSlide>

        </Swiper>

      </div>
    </div>
  )
}

export default NewProducts