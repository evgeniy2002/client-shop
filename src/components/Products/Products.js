import React from 'react'
import s from './Products.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand, getDevices, getTypes, updateRatign, updateRatignLink } from '../../http/deviceApi'
import { setPopularBrands, setRecommendBrands } from '../../redux/reducers/brand-reducer'
import cancel from '../../assets/images/icons/cancel.png'
import BestsellerProducts from './BestsellerProducts/BestsellerProducts'
import RecommendBrands from './RecommendBrands/RecommendBrands'
import PopularCategory from './PopularCategory/PopularCategory'
import PopularGoods from './PopularGoods/PopularGoods'
import { setBestsellerDevice, setPopularDevice } from '../../redux/reducers/devices-reducer'



export default function Products() {

  const dispatch = useDispatch()

  let { bestsellerDevice, popularGoods, popularBrands, recommendBrands } = useSelector(({ devices, brands }) => {
    return {
      bestsellerDevice: devices.bestsellerDevice,
      popularGoods: devices.popularDevice,
      popularBrands: brands.popularBrands,
      recommendBrands: brands.recommendBrands
    }
  })

  // React.useEffect(() => {
  //   getDevices(null, 'rating', 'desc', 1, 15, 0, null, null)
  //     .then(({ data }) => dispatch(setPopularDevice(data)))
  //     .catch(err => console.error(err))

  //   document.body.addEventListener('click', handleOutSideClick)
  // }, [])
  React.useEffect(() => {
    // var deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000); // for endless timer
    // initializeClock('countdown', deadline);
    getDevices(null, 'rating', 'desc', 1, 15, 0, null, null)
      .then(({ data }) => dispatch(setPopularDevice(data)))
      .catch(err => console.error(err))

    getDevices(null, 'rating', 'desc', 1, 15, 0, null, null, true)
      .then(({ data }) => dispatch(setBestsellerDevice(data)))
      .catch(err => console.error(err))


    getTypes(null, 'rating')
      .then(({ data }) => dispatch(setPopularBrands(data)))
      .catch(err => console.error(err))

    getAllBrand(null, 'rating')
      .then(({ data }) => dispatch(setRecommendBrands(data)))
      .catch(err => console.error(err))
  }, [])


  // function getTimeRemaining(endtime) {
  //   var t = Date.parse(endtime) - Date.parse(new Date());
  //   var seconds = Math.floor((t / 1000) % 60);
  //   var minutes = Math.floor((t / 1000 / 60) % 60);
  //   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //   var days = Math.floor(t / (1000 * 60 * 60 * 24));
  //   return {
  //     'total': t,
  //     'days': days,
  //     'hours': hours,
  //     'minutes': minutes,
  //     'seconds': seconds
  //   };
  // }

  // function initializeClock(id, endtime) {
  //   var clock = document.getElementById(id);
  //   var daysSpan = clock.querySelector('.days');
  //   var hoursSpan = clock.querySelector('.hours');
  //   var minutesSpan = clock.querySelector('.minutes');
  //   var secondsSpan = clock.querySelector('.seconds');

  //   function updateClock() {
  //     var t = getTimeRemaining(endtime);

  //     if (t.total <= 0) {
  //       clearInterval(timeinterval);
  //       setTimeout(() => {
  //         var deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000);
  //         initializeClock('countdown', deadline);
  //       }, 24 * 60 * 60 * 1000)
  //     }

  //     daysSpan.innerHTML = t.days + ':';
  //     hoursSpan.innerHTML = ('0' + t.hours).slice(-2) + ':';
  //     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2) + ':';
  //     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

  //     if (t.total <= 0) {
  //       setTimeout(clearInterval(timeinterval), 5000)
  //     }
  //   }

  //   updateClock();
  //   var timeinterval = setInterval(updateClock, 1000);
  // }
  // popularGoods = []
  // popularBrands = []
  const changeRatingItem = (id, rating) => {


    updateRatign(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  const changeRatingLinkCount = (id, click_to_link) => {

    updateRatignLink(id, click_to_link += 1)
      .then(data => { })
      .catch(err => console.error(err))

  }

  return (
    <section className={s.products}>
      <div className="container">
        <div className={s.products_row}>


          <div className={s.products_columns}>
            <div className={s.products_body}>
              <PopularCategory
                popularBrands={popularBrands}
                cancel={cancel}
                />
              <BestsellerProducts
                bestsellerDevice={bestsellerDevice}
                cancel={cancel}
                changeRatingLinkCount={changeRatingLinkCount}
                changeRatingItem={changeRatingItem}
                />

              <RecommendBrands
                recommendBrands={recommendBrands}
                cancel={cancel}
                />
              <PopularGoods
                popularGoods={popularGoods}
                cancel={cancel}
                changeRatingLinkCount={changeRatingLinkCount}
                changeRatingItem={changeRatingItem}
                />
              {/* <PopularCategory
                popularBrands={popularBrands}
                cancel={cancel}
                />
                <BestsellerProducts
                popularGoods={popularGoods}
                cancel={cancel}
                changeRatingItem={changeRatingItem}
              />
              <RecommendBrands />
              <PopularGoods
                popularGoods={popularGoods}
                cancel={cancel}
                changeRatingItem={changeRatingItem}
              /> */}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

{/* <div className={s.present_columns}>
          
          <div className={s.present_item}>

            <div className={s.present_img}>
              <a href="/present" className={s.present_img_content}>
              <img className={s.present_img + ' ' + 'ibg'} src={products_main} alt="" />
                <p className={s.present_item_title}>Товар недели</p>
                <h3 className="countdown-title products_subtitle">До Новых подарков</h3>
                <div id="countdown" className="countdown timer">
                  <div className="countdown-number">
                    <span className="days countdown-time"></span>
                    <span className="countdown-text">дней</span>
                  </div>
                  <div className="countdown-number">
                    <span className="hours countdown-time"></span>
                    <span className="countdown-text">часов</span>
                  </div>
                  <div className="countdown-number">
                    <span className="minutes countdown-time"></span>
                    <span className="countdown-text">минут</span>
                  </div>
                  <div className="countdown-number">
                    <span className="seconds countdown-time"></span>
                    <span className="countdown-text">секунд</span>
                  </div>
                </div>
              </a>
            
          </div>
        </div> */}