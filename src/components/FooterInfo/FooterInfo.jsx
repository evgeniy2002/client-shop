import React from 'react';
import { Link } from 'react-router-dom'

import s from './FooterInfo.module.css'

import home from '../../assets/images/icons/home.svg'
import home_hover from '../../assets/images/icons/home_icon-hover.svg'
import catalog from '../../assets/images/icons/search.svg'
import catalog_hover from '../../assets/images/icons/search_hover.svg'
import vk from '../../assets/images/icons/vk-circle.svg'
import vk_hover from '../../assets/images/icons/vk-circle-hover.svg'

function FooterInfo() {

 
  const [homeState, setHomeState] = React.useState(false)
  const [catalogState, setCatalogState] = React.useState(false)
  const [vkState, setVkState] = React.useState(false)


  const changeHomeState = () => {
    setHomeState(true)
    setCatalogState(false)
    setVkState(false)
  }
  const changeCatalogState = () => {
    setHomeState(false)
    setCatalogState(true)
    setVkState(false)
  }
  const changeVkState = () => {
    setHomeState(false)
    setCatalogState(false)
    setVkState(true)
  }

  return (

    <div className={s.footerInfo}>
      <div className={s.footerInfo_body}>
        <div className={s.footer_row_info}>
          <Link to="/" className={s.footer_columns_info} onClick={changeHomeState}>
            {
              homeState
                ? <div className={s.footer_info_img}>

                  <img src={home_hover} alt="" />
                </div>
                : <div className={s.footer_info_img}>

                  <img src={home} alt="" />
                </div>
            }

          </Link>
          <Link to="/all_category" className={s.footer_columns_info} onClick={changeCatalogState}>
            {
              catalogState
                ? <div className={s.footer_info_img}>

                  <img src={catalog_hover} alt="" />
                </div>
                : <div className={s.footer_info_img}>

                  <img src={catalog} alt="" />
                </div>
            }

          </Link>
          <Link to="#" className={s.footer_columns_info} onClick={changeVkState}>
            {
              vkState
                ? <div className={s.footer_info_img}>

                  <img src={vk_hover} alt="" />
                </div>
                : <div className={s.footer_info_img}>

                  <img src={vk} alt="" />
                </div>
            }

          </Link>

        </div>
      </div>
    </div>
  )
}

export default FooterInfo;
