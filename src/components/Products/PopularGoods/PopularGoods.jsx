import React from 'react'
import s from '../Products.module.css'

export default function PopularGoods({ popularGoods, cancel, changeRatingItem }) {


  // const [stateQuickView, setStateQuickView] = React.useState(false)
  // const [itemInfo, setItemInfo] = React.useState([])

  // const testFunc = (e, item) => {
  //   e.preventDefault()
  //   e.stopPropagation();
  //   e.nativeEvent.stopImmediatePropagation();
  //   setStateQuickView(!stateQuickView)
  //   setItemInfo(item)
  // }

  return (
    <div className={s.products_body_footer}>
      <div className={s.products_body_title}><span>Популярные товары</span></div>

      <div className={s.products_header_row}>
        {popularGoods.length
          ? popularGoods.map(item => (
            <a key={item.id} href={"/device/" + item.id} className={s.products_header_item} onClick={() => changeRatingItem(item.id, item.rating)}>
              {
                item.img === null
                  ? <div className={s.products_item_img + ' ' + s.products_item_cancel + ' ' + 'ibg'}></div>
                  : <div className={s.products_wrapper_item_img}>

                    <div className={s.products_item_img + ' ' + 'ibg'}>
                      <img src={'https://media.proglib.io/wp-uploads/2017/04/k48Of_7aCho.jpg'} alt="" />
                    </div>
                    {/* <button className={s.quick_view_item} onClick={(e) => testFunc(e, item)}>
                      Быстрый просмотр
                    </button> */}
                    <div className={s.info_about_discounts}>
                      <span>-35&#x25;</span>
                    </div>
                  </div>
              }

              <div className={s.wrapper_price_info}>
                <div className={s.products_item_price}><span>{item.price} &#8381;</span></div>
                <div className={s.products_item_old_price}><span>{item.price} &#8381;</span></div>

              </div>
              <div className={s.products_item_name}><span>{item.device_name}</span></div>
              <div className={s.products_item_btn}><span>Написать</span></div>



            </a>

          ))
          : <div className={s.products_header_item + ' ' + s.products_cancel_item}>
            <div className={s.products_item_img}>

              <img src={cancel} alt="" />
            </div>
          </div>
        }

      </div>
      {/* {
        stateQuickView
        && <PopapView item={itemInfo} />
      } */}
    </div>
  )
}
