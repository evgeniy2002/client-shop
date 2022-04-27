import React from 'react'
import s from './PopupForVk.module.css'
import three from '../../assets/images/icons/three_vk.svg'
import four from '../../assets/images/icons/four_vk.svg'

function PopupForVk({link_to_vk_other, link_to_vk, popupVkState}) {

  return (
    <div className={popupVkState ? s.popupVkModal + ' ' + s.active : s.popupVkModal}>
      <div className={s.popupVkModalContainer}>
        <div className={s.popupVkModalBody}>
          <div className={s.popupVkModalBodyColumns}>
            <a href={link_to_vk} target="_blank" className={s.popup_vk_btn}>Общежитие №&#32;<img src={three} alt="" /></a>
          </div>
          <div className={s.popupVkModalBodyColumns}>
            <a href={link_to_vk_other} target="_blank" className={s.popup_vk_btn}>Общежитие №&#32;<img src={four} alt="" /></a>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupForVk