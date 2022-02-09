import React from 'react'
import s from '../Header.module.css'
import { Field, reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import loupe from '../../../assets/images/icons/loupe-form.svg'
import { getDevices, getDeviceWithSearch } from '../../../http/deviceApi'
import { setPopularDevice, setSearchDevice } from '../../../redux/reducers/devices-reducer'
import HeaderFormColumn from './HeaderFormColumn/HeaderFormColumn'
import Preloader from '../../../assets/loader/Preloader'



const HeaderForm = (props) => {

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
    getDevices(null, 'rating', 'desc', 1, 6, 0, null, null)
      .then(({ data }) => dispatch(setPopularDevice(data)))
      .catch(err => console.error(err))

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
    <div ref={formRef} className={`${s.header_search} ${adaptiveSearch ? s.active : ''}`} >
      <form onSubmit={props.handleSubmit} onClick={clickOnForm}>

        <Field component={'input'} type="text" name="name" value={formValue} onClick={handleStateSearch} className={s.header_input} onChange={handleFormState} autoCapitalize={'off'} autoComplete={'off'} placeholder={'Искать товары'} />

        <div className={s.btn}><img src={loupe} alt="" /></div>



      </form>
      <div onClick={closeAdaptiveForm} className={s.closeAdaptiveSearch}>Отмена</div>

      <div className={`${s.form_subdate} ${toggleFormState ? s.active : ''}`}>

        <div className={s.form_subdate_content}>
          {
            renderFormPopulation
            && <div className={s.popularProducts}>Популярные товары</div>
          }
          {
            searchDevice.length === 0 && !renderFormPopulation
            && <div className={s.popularProducts}>Ни одного товара не найдено</div>
          }
          {
            searchDevice.length !== 0 && !renderFormPopulation
            && <div className={s.popularProducts}>Найденные товары</div>
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
    </div >
  )
}

let ReduxHeaderForm = reduxForm({ form: 'headerForm' })(HeaderForm)

export default ReduxHeaderForm

