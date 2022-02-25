import React from 'react'
import s from '../Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDevices, getDeviceWithSearch } from '../../../http/deviceApi'
import { setPopularDevice, setSearchDevice } from '../../../redux/reducers/devices-reducer'
import HeaderFormColumn from './HeaderFormColumn/HeaderFormColumn'
import Preloader from '../../../assets/loader/Preloader'

import loupe from '../../../assets/images/icons/loupe-form.svg'


const HeaderInput = (props) => {

  const dispatch = useDispatch()

  const formRef = React.useRef()

  const { searchDevice, popularDevice } = useSelector(({ devices }) => {
    return {
      searchDevice: devices.searchDevice,
      popularDevice: devices.popularDevice
    }
  })

  const [toggleFormState, setToggleFormState] = React.useState(false)
  const [formValue, setFormValue] = React.useState('')
  const [renderFormPopulation, setRenderFormPopulation] = React.useState(false)
  // const [notFoundGoods, setNotFoundGoods] = React.useState(false)
  const [adaptiveSearch, setAdaptiveSearch] = React.useState(false)


  React.useEffect(() => {
    getDeviceWithSearch(formValue)
      .then(({ data }) => dispatch(setSearchDevice(data)))
      .catch(err => console.error(err))


    if (formValue.length === 0) {
      setRenderFormPopulation(true)
    } else {
      setRenderFormPopulation(false)
    }

  }, [formValue])


  React.useEffect(() => {


    document.body.addEventListener('click', handleOutSideClick)
  }, [])

  const handleOutSideClick = (e) => {
    if (!e.path.includes(formRef.current)) {
      setToggleFormState(false)

    }
  }

  const handleFormState = (event) => {


    setFormValue(event.target.value)
    setToggleFormState(true)


  }

  const handleStateSearch = () => {
    setAdaptiveSearch(true)
    document.body.classList.add('lock')
  }


  const closeAdaptiveForm = () => {
    setAdaptiveSearch(false)
    if (props.catalogState === true) {
      document.body.classList.add('lock')
    }
    if (props.catalogState === false) {
      document.body.classList.remove('lock')

    }
    setToggleFormState(false)
  }
  const clickOnForm = () => {
    if (window.matchMedia("(min-width: 500px)").matches) {
      if (props.catalogState === true) {
        props.setStateCatalog(false)
        document.body.classList.remove('lock')
      }
    }
  }

  return (
    //ref={formRef}
    <div ref={formRef} className={`${s.header_search} ${adaptiveSearch ? s.active : ''}`} onClick={clickOnForm}>
      {/* <form onSubmit={props.handleSubmit} onClick={clickOnForm}> */}

      <div className={s.header_input_info_row}>

        <input
          type="text"
          name="name"
          value={formValue}
          onClick={handleStateSearch}
          className={s.header_input}
          onChange={handleFormState}
          autoCapitalize={'off'}
          autoComplete={'off'}
          placeholder={'Поиск товаров'}
        />



        <div className={`${s.form_subdate} ${toggleFormState ? s.active : ''}`}>

          <div className={s.form_subdate_content}>
            {
              renderFormPopulation
              && <div className={s.popularProducts}>Популярные товары</div>
            }
            {
              searchDevice.length === 0 && !renderFormPopulation
              && <div className={s.popularProducts}>Ни чего не найдено</div>
            }

            {renderFormPopulation

              ? popularDevice.map(item => (
                <HeaderFormColumn item={item} key={item.id} />
              ))
              : searchDevice.map(item => (
                <HeaderFormColumn item={item} key={item.id} />
              ))
            }

          </div>
        </div>
      </div>



<div onClick={closeAdaptiveForm} className={s.closeAdaptiveSearch}>Отмена</div>

      {/* </form> */}


    </div >
  )
}


export default HeaderInput

