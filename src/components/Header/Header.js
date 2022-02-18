import React from 'react'
import s from './Header.module.css'
import vk_logo from '../../assets/images/icons/vk.svg'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeTC } from '../../redux/reducers/type-reducer'
import {  updateRatignType } from '../../http/deviceApi'
import HeaderInput from './HeaderForm/HeaderInput'




export default function Header() {
  const dispatch = useDispatch()

  const [catalogState, setStateCatalog] = React.useState(false)


  const { types } = useSelector(({ types }) => {
    return {
      types: types.typesArr
    }
  })

  let item_img = React.useRef()

  const headerRef = React.useRef()

  React.useEffect(() => {

    dispatch(getTypeTC())

    document.body.addEventListener('click', handleOutSideClick)
  }, [])

  React.useEffect(() => {

    ibg()

  })


  let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
  };

  let body = document.querySelector('body');

  if (isMobile.any()) {
    body.classList.add('touch');
  } else {
    body.classList.add('mouse');
  }


  const handleClick = () => {

    setStateCatalog(!catalogState)

    body.classList.toggle('lock')
  }

  const handleOutSideClick = (e) => {
    if (!e.path.includes(headerRef.current)) {
      setStateCatalog(false)
    }
  }

  const ibg = React.useCallback(() => {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
        ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }, [])


  const changeRatingType = React.useCallback((id, rating) => {


    updateRatignType(id, rating += 1)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  })

  return (
    <header className={s.header} ref={headerRef}>
      <div className='container'>
        <div className={s.header_row}>
          <div className={catalogState ? s.active + ' ' + s.header_catalog : s.header_catalog} onClick={() => handleClick()}>
            <div className={s.header_burger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={s.catalog_text}>Каталог</div>
          </div>
         
            <HeaderInput setStateCatalog={setStateCatalog} catalogState={catalogState} handleClick={handleClick} />
            

          <div className={s.social_network}>
            <a href="" className={s.header_icons}><img src={vk_logo} alt="" /></a>
          </div>
        </div>
        <div className={classNames(s.popup_menu_product, {
          [s.active]: catalogState === true,
        })}
       
        >

          

          <ul className={s.sub_menu}>

            {
              types.map(item => {
                return <li className={s.menu_columns} key={item.id}>
                  <a
                    href={'/category/' + item.type_name}
                  
                  >
                    <div className={s.menu_item} onClick={() => changeRatingType(item.id, item.rating)}>
                      <div className={s.menu_item_row}>
                        {
                          item.img === null
                          ? <div ref={item_img} className={s.menu_item_img + ' ' + s.menu_item_cancel + ' ' + 'ibg'}> </div>
                          : <div ref={item_img} className={s.menu_item_img + ' ' + 'ibg'}><img src={item.img} alt="" /></div>
                        }
              
                        <div className={s.menu_item_label}><span>{item.type_name}</span></div>
                      </div>
                    </div>
                  </a>
                </li>
              })
            }

          </ul>
          
        </div>
      </div>
    </header>

  )
}





