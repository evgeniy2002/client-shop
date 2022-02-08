import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDevices, getDevicePageTC } from '../redux/reducers/devices-reducer'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import eye from '../assets/images/icons/eye.png'
import { getAllBrand, getDevices, updateRatign } from '../http/deviceApi'

export default function DevicePage() {

  const dispatch = useDispatch()

  const params = useParams()

  const [adaptiveBtn, setAdaptiveBtn] = React.useState(false)
  const [modalActive, setModalActive] = React.useState(false)

  const { id } = useParams()

  const { recommended, currentDevice } = useSelector(({ devices }) => {
    return {
      recommended: devices.items,
      currentDevice: devices.currentDevice
    }
  })

  React.useEffect(() => {
    if (params.type) {

      getAllBrand()
        .then(({ data }) => {
          let device = data.filter(item => item.brands_name === params.type)

          getDevices(device[0].id, 'rating', 'desc', 1, 6, 0, null, null)
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


  const changeRatingItem = (id, rating) => {

    updateRatign(id, rating += 1)
      .then(data => console.log(data))

  }

  return (

    <div className="devicePage">

      <div className="container">
        <div className="brear_crumbs_container">
          <BreadCrumbs />
        </div>

        {
          currentDevice.map(device => (
            <div key={device.id} className="device_body">
              <div className="all_watch">
                <img src={eye} alt="" />
                <span>{device.rating}</span>
              </div>
              <div className="devicePage_item-title"><span>{device.device_name}</span></div>

              <div className="devicePage_row">

                <div className="devicePage_columns">
                  {
                    device.img === null
                      ? <div className="devicePage_img devicePage_img_cancel ibg"></div>
                      : <div className="devicePage_img ibg">
                        <img src={device.img} alt="" />
                      </div>
                  }

                </div>
                <div className="devicePage_columns">
                  <div className="devicePage_item">
                    <div className="devicePage_item-description">
                      <div className="item_description-title">Описание</div>
                      <div className="devicePage_sub_description">
                        {
                          device.description
                            ? device.description
                            : <div> Здесь должно быть описание товара, но к сожалению его нет &#128532;</div>
                        }
                      </div>

                    </div>
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

        {
          recommended.length
            ? <div className="recommended_goods">
              <p className="recommended_goods_title">Рекомендуем также</p>
              <div className="recommended_goods_row">
                {
                  recommended.map(item => (
                    <div className="recommended_goods_columns" key={item.device_name}>
                      <a href={item.id} className="recommended_goods_item" onClick={() => changeRatingItem(item.id, item.rating)}>
                        {
                          item.img === null
                            ? <div className="goods_item_img devicePage_img_cancel ibg"></div>
                            : <div className="goods_item_img ibg"><img src={item.img} alt="" /></div>
                        }


                        <div className="goods_item_title">{item.device_name}</div>
                        <div className="goods_item_price">{item.price} &#8381;</div>
                        <a href="#" className='goods_item_btn'>Написать</a>
                      </a>
                    </div>
                  ))
                }

              </div>
            </div>
            : ''
        }

      </div>
    </div>

  )
}
