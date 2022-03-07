import React, { useEffect } from 'react'
import s from './Main.module.css'
import main_picture from '../../assets/images/exnxkpgpgvdl7gh5qtge1032cj4.jpeg'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Pagination, EffectFade } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import '../../App.css'

export default function Main() {
  useEffect(() => {

    ibg();

  }, [])

  function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
        ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }

  return (
    <section className={s.online_store}>
      <div className="container">
        <div className='store_row'>
          {/* <Swiper
            modules={[Pagination, EffectFade]}
            // pagination={{
              //   clickable: true,
              // }}
              loop={true}
              spaceBetween={30}
              className='mySwiperMain'
              spaceBetween={30}
              effect={"fade"}
              grabCursor={true}
              pagination={true}
       
          > */}
            {/* <SwiperSlide> */}
              <h1 className={s.store_title}>Интернет Магазин</h1>
              {/* <div className={s.store_subtitle}><span>Успей</span> <span>купить</span> <span>по низкой цене</span></div> */}

              <div className={s.online_store_preview + ' ' + "ibg"}>
                <img src={main_picture} alt="" />
              </div>
            {/* </SwiperSlide>
            <SwiperSlide> */}
              {/* <h1 className={s.store_title}>Интернет Магазин</h1>
              <div className={s.store_subtitle}><span>Успей</span> <span>купить</span> <span>по низкой цене</span></div>

              <div className={s.online_store_preview + ' ' + "ibg"}>
                <img src={main_screen_two} alt="" />
              </div> */}
            {/* </SwiperSlide>
            
          </Swiper> */}
        </div>
      </div>
    </section>
  )
}
