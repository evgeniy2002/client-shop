import React from 'react'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import s from '../Goods.module.css'

export default function FilterBody({ maxPrice, upperValue, lowerValue, shopDateFilter, closeFilter, rangeValue, changeStateFilter }) {

  return (
    <div className={s.filter_body}>
      <div className={s.filter_body_title}>Фильтр</div>
      <div className={s.filter_close}>
        <button onClick={closeFilter}><span>Отмена</span></button>
      </div>
      <div className={s.filter_section}>
        <div className={s.filter_section_price}>
          <div className={s.filter_section_title}>Цена</div>
          <div className={s.filter_section_body}>
            <Nouislider
              onUpdate={(value) => rangeValue(value)}
              onChange={changeStateFilter}
              range={{ min: 0, max: maxPrice ? maxPrice : 1000 }}
              start={[0, maxPrice ? maxPrice : 1000]}
              // tooltips={true}
              connect

            />
          </div>
          <div className={s.filter_section_info}>
            <div className={s.filter_info_column}>
              <div className={s.filter_column_label}>от</div>
              <div className={s.filter_column_values}>{lowerValue}</div>
            </div>
            <div className={s.filter_info_column}>
              <div className={s.filter_column_label}>до</div>
              <div className={s.filter_column_values}>{upperValue}</div>
            </div>
          </div>
        </div>
      </div>
      <button className={s.filter_btn} onClick={shopDateFilter}>Посмотреть</button>
      {/* <button className={s.filter_btn} onClick={shopDateFilter}>Показать <span>товаров {deviceItems.length}</span></button> */}
    </div>
  )
}
