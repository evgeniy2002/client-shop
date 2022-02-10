import React from 'react';
import { Link } from 'react-router-dom'

import s from './FooterInfo.module.css'
import home from '../../assets/images/icons/home.svg'
import home_hover from '../../assets/images/icons/home-hover.svg'
import catalog from '../../assets/images/icons/search.svg'
import catalog_hover from '../../assets/images/icons/search-hover.svg'
import heart from '../../assets/images/icons/heart.svg'
import heart_hover from '../../assets/images/icons/heart-hover.svg'

function FooterInfo() {

  const [activeIconHome, setActiveHome] = React.useState(false)
  const [activeIconCatalog, setActiveCatalog] = React.useState(false)
  // const [activeIconFavorite, setActiveFavorite] = React.useState(false)

  const changeIconStateHome = () => {
    setActiveHome(!activeIconHome)
    setActiveCatalog(false)
    // setActiveFavorite(false)
  }
  const changeIconStateCatalog = () => {
    setActiveCatalog(!activeIconCatalog)
    setActiveHome(false)
    // setActiveFavorite(false)
  }
  // const changeIconStateFavorite = () => {
  //   setActiveFavorite(!activeIconFavorite)
  //   setActiveHome(false)
  //   setActiveCatalog(false)
  // }


  return (
    
    <div className={s.footerInfo}>
      <div className="container">
        <div className={s.footer_info_row}>
          <div className={s.footer_info_columns}>
            <a href="/" className={s.footer_info_item} onClick={changeIconStateHome}>
              <div className={s.footer_item_img}><img src={activeIconHome ? home_hover : home} alt="" /></div>
              {/* <div className={activeIconHome ? s.footer_info_label_active : s.footer_info_label}>Главная</div> */}
            </a>
          </div>
          <div className={s.footer_info_columns}>
            <a href="/all_category" className={s.footer_info_item} onClick={changeIconStateCatalog}>
              <div className={s.footer_item_img + ' ' + s.footer_icon_img}><img src={activeIconCatalog ? catalog_hover : catalog} alt="" /></div>
              {/* <div className={activeIconCatalog ? s.footer_info_label_active : s.footer_info_label}>Каталог</div> */}
            </a>
          </div>
          {/* <div className={s.footer_info_columns}>
            <Link to="/favorites" className={s.footer_info_item} onClick={changeIconStateFavorite}>
              <div className={s.footer_item_img}><img src={activeIconFavorite ? heart_hover : heart} alt="" /></div>
              <div className={activeIconFavorite ? s.footer_info_label + ' ' + s.active : s.footer_info_label}>Избранное</div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default FooterInfo;
