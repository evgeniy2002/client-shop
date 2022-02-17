import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDevices, getDevicePageTC } from '../redux/reducers/devices-reducer'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import eye from '../assets/images/icons/eye.png'
import { getAllBrand, getDevices } from '../http/deviceApi'
import heart from '../assets/images/icons/heart.svg'
import RecommendList from '../components/RecommendList/RecommendList'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function DevicePage() {

  const dispatch = useDispatch()

  const params = useParams()
  const history = useHistory()

  const [adaptiveBtn, setAdaptiveBtn] = React.useState(false)
  const [modalActive, setModalActive] = React.useState(false)
  const [stateNextRead, setStateNextRead] = React.useState(false)

  const { id } = useParams()

  const { recommended, currentDevice } = useSelector(({ devices }) => {
    return {
      recommended: devices.items,
      currentDevice: devices.currentDevice
    }
  })
  // console.log(params.type)
  React.useEffect(() => {
    if (params.type) {

      getAllBrand()
        .then(({ data }) => {
          let device = data.filter(item => item.brands_name === params.type)

          getDevices(device[0].id, 'rating', 'desc', 1, 20, 0, null, null)
            .then(({ data }) => {

              let filter_device = data.filter(item => item.id !== params.id)
              dispatch(addDevices(filter_device))

            })

        })

    }
  }, [])


  React.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setAdaptiveBtn(true)
      setModalActive(true)
    }
    dispatch(getDevicePageTC(id))
  }, [])


  // const handleNextReat = () => {
  //   setStateNextRead(!stateNextRead)
  // }

  return (

    <div className="devicePage">

      <div className="container">
        <div className="brear_crumbs_container">
          {
            !params.type
              ? <div className='go_back'>
                <button onClick={history.goBack}>Назад</button>
              </div>
              : <BreadCrumbs />
          }

        </div>

        {
          currentDevice.map(device => (
            <div key={device.id} className="device_body">

              <div className="devicePage_item-title"><span>{device.device_name}</span></div>
              <div className="all_watch">
                <img src={eye} alt="" />
                <span>{device.rating}</span>
              </div>

              <div className="devicePage_row">

                <div className="devicePage_columns">
                  {
                    device.img === null
                      ? <div className="devicePage_img devicePage_img_cancel ibg"></div>
                      : <TransformWrapper
                        initialScale={1}

                      >
                        <TransformComponent>

                          <div className="devicePage_img ibg">
                            <img src={device.img} alt="" />
                          </div>
                        </TransformComponent>
                      </TransformWrapper>
                  }
                  {/* <div className='favorite_click'>
                    <img src={heart} alt="" />
                  </div> */}
                </div>
                <div className="devicePage_columns">
                  <div className="devicePage_item">

                    <div className="devicePage_item-body">
                      <div className="body_item">
                        <div className="info">
                          <div className="body_item-price">{device.price} &#8381;</div>
                          <div className="info_body">

                            <div className="info_text">
                              Вы можете написать продавцу,
                              чтобы он отложил товар,
                              если нет возможности купить и забрать его сейчас.
                            </div>
                          </div>

                        </div>
                        <a href="https://vk.com/id520073022" className="body_btn">Написать продавцу {
                          adaptiveBtn
                            ? <span>{device.price} &#8381;</span>
                            : ''
                        }
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className={stateNextRead ? "devicePage_item-description item_description-active" : "devicePage_item-description"}>
                <div className="item_description-title">Описание</div>
                <div className="devicePage_sub_description">
                  {
                    device.description
                      ? device.description
                      : <div> Здесь должно быть описание товара, но к сожалению его нет &#128532;</div>
                  }
                </div>
              </div>

              {/* <button className={stateNextRead ? 'devicePage_buttom_next-read buttom_next_read-false' : 'devicePage_buttom_next-read'} onClick={handleNextReat}>Читать далее</button> */}
            </div>
          ))
        }
        {
          modalActive &&
          <div className='modal'>
            <div className='modal_content'>
              <div className="modal_title">Вы также можете!</div>
              <p className='modal_info'>
                Написать продавцу
                чтобы он отложил товар,
                если нет возможности купить и забрать его сейчас.
              </p>
            </div>
          </div>
        }


        <RecommendList recommended={recommended} />


      </div>
    </div>

  )
}
