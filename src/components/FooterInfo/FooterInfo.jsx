import React from 'react';
import { Link } from 'react-router-dom'

import s from './FooterInfo.module.css'

import home from '../../assets/images/icons/home.svg'
import catalog from '../../assets/images/icons/search.svg'
import vk from '../../assets/images/icons/vk-circle.svg'

function FooterInfo() {


  return (

    <div className={s.footerInfo}>
      <div className={s.footerInfo_body}>
        <div className={s.footer_row_info}>
          <Link to="/" className={s.footer_columns_info}>
            <div className={s.footer_info_img}>

              <img src={home} alt="" />
            </div>
            <div className={s.footer_info_label}>Главная</div>
          </Link>
          <Link to="/all_category" className={s.footer_columns_info}>
            <div className={s.footer_info_img + ' ' + s.footer_info_img_catalog}>
              <img src={catalog} alt="" />
            </div>
            <div className={s.footer_info_label}>Каталог</div>
          </Link>
          <Link to="#" className={s.footer_columns_info}>
            <div className={s.footer_info_img}>
              <img src={vk} alt="" />
            </div>
            <div className={s.footer_info_label}>В контакте</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterInfo;
