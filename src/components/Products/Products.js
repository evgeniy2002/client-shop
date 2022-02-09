import React from 'react'
import s from './Products.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, updateRatign } from '../../http/deviceApi'
import { setPopularBrands } from '../../redux/reducers/brand-reducer'
import cancel from '../../assets/images/icons/cancel.png'



export default function Products() {

  const dispatch = useDispatch()

  const { popularGoods, popularBrands } = useSelector(({ devices, brands }) => {
    return {
      popularGoods: devices.popularDevice,
      popularBrands: brands.popularBrands
    }
  })

  React.useEffect(() => {
    // var deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000); // for endless timer
    // initializeClock('countdown', deadline);



    getTypes(null, 'rating')
      .then(({ data }) => dispatch(setPopularBrands(data)))
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

  const changeRatingItem = (id, rating) => {


    updateRatign(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }


  return (
    <section className={s.products}>
      <div className="container">
        <div className={s.products_row}>


          <div className={s.products_columns}>
            <div className={s.products_body}>
              <div className={s.products_body_header}>
                <div className={s.products_body_title}><span>Популярные категории</span></div>

                <div className={s.products_header_row}>
                  {popularBrands.length
                    ?
                    popularBrands.map(item => (
                      <a key={item.id} href={"/category/" + item.type_name} className={s.products_header_item}>
                        {
                          item.img === null
                            ? <div className={s.products_item_img  + ' ' + s.products_item_cancel + ' ' + 'ibg'}></div>
                            : <div className={s.products_item_img + ' ' + 'ibg'}>
                              <img src={item.img} alt="" />
                            </div>
                        }
                        <div className={s.products_item_name}><span>{item.type_name}</span></div>
                      </a>

                    ))
                    : <div className={s.products_header_item + ' ' + s.products_cancel_item}>
                      <div className={s.products_item_img}>

                        <img src={cancel} alt="" />
                      </div>
                    </div>
                  }

                </div>
              </div>
              <div className={s.products_body_footer}>
                <div className={s.products_body_title}><span>Популярные товары</span></div>

                <div className={s.products_header_row}>
                  {popularGoods.length
                    ? popularGoods.map(item => (
                      <a key={item.id} href={"/device/" + item.id} className={s.products_header_item} onClick={() => changeRatingItem(item.id, item.rating)}>
                        {
                          item.img === null
                            ? <div className={s.products_item_img  + ' ' + s.products_item_cancel + ' ' + 'ibg'}></div>
                            : <div className={s.products_item_img + ' ' + 'ibg'}>
                              <img src={item.img} alt="" />
                            </div>
                        }


                        <div className={s.products_item_name}><span>{item.device_name}</span></div>
                      </a>

                    ))
                    : <div className={s.products_header_item + ' ' + s.products_cancel_item}>
                      <div className={s.products_item_img}>

                        <img src={cancel} alt="" />
                      </div>
                    </div>
                  }

                </div>
              </div>
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