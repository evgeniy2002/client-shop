import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDevices, getDevicePageTC } from '../redux/reducers/devices-reducer'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import eye from '../assets/images/icons/eye.svg'
import { getAllBrand, getDevices, getInfoDevice, getOneDevice, updateRatignLink } from '../http/deviceApi'
import RecommendList from '../components/RecommendList/RecommendList'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function DevicePage() {

  const dispatch = useDispatch()

  const params = useParams()
  const history = useHistory()

  const [adaptiveBtn, setAdaptiveBtn] = React.useState(false)
  const [modalActive, setModalActive] = React.useState(false)
  const [infoDevice, setInfoDevice] = React.useState([])

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

          getDevices(device[0].id, 'rating', 'desc', 1, 20, 0, null, false)
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
  
    getOneDevice(id)
      .then(({ data }) => {
        // console.log(data[1])
        setInfoDevice(data[1])
      })

  }, [])



  const changeRatingLinkCount = (id, click_to_link) => {

    updateRatignLink(id, click_to_link += 1)
      .catch(err => console.error(err))

  }

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
              <div className="devicePage_item_info_main">
                <div className="all_watch">
                  <img src={eye} alt="" />
                  <span>{device.rating}</span>
                </div>

                {
                  device.percent === 0
                    ? ''
                    : <div className='goods_info_about_disconts'>
                      <span>&ndash;{device.percent}&#x25;</span>
                    </div>
                }
                {
                  Math.abs(new Date().getTime() - new Date(device.create_at).getTime()) / (1000 * 3600 * 24) < 1
                    ? <div className='devicePage_about_time'>
                      <span>Новинка</span>
                    </div>
                    : ''
                }

                {
                  device.click_to_link > 4
                    ? <div className="devicePage_bestseller_info bestseller_info"><span>Бестселлер</span></div>
                    : ''
                }
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
                </div>
   
                {
                  infoDevice.length > 0
                    ? <div className="devicePage_columns devicePage_columns_info">

                      <div className="title_info">Характеристики</div>
                      <table className='devicePage_table'>

                        <tbody>
                          {
                            infoDevice.map(item => (
                              <tr key={item.id}>
                                <td className='devicePage_td devicePage_td_label'><span>{item.title}</span></td>
                                <td className='devicePage_td devicePage_td_info'><span>{item.description}</span></td>
                              </tr>
                            ))
                          }
                        </tbody>

                      </table>
                    </div>
                    : null
                }
                <div className="devicePage_columns">
                  <div className="devicePage_item">

                    <div className="devicePage_item-body">
                      <div className={device.product_availability ? "body_item" : "body_item body_item_other"}>
                        <div className="info">
                          <div className="info_price">

                            <div className={device.old_price === 0 ? "body_item-price" : "body_item-price body_item-price_color"}><span>{device.price} &#8381;</span></div>
                            {
                              device.old_price === 0
                                ? ''
                                : <div className="body_item-old_price"><span>{device.old_price} &#8381;</span></div>
                            }

                          </div>
                          {
                            device.product_availability
                              ? <div className="info_body">

                                <div className="info_text">
                                  Вы можете написать продавцу,
                                  чтобы он отложил товар,
                                  если нет возможности купить и забрать его сейчас.
                                </div>

                                <div className="info_check_mark_label">
                                  <span>Есть в наличии</span>
                                </div>
                              </div>
                              : ''
                          }


                        </div>
                        {
                          device.product_availability

                            ? <a href={device.link_to_vk} target="_blank" onClick={() => changeRatingLinkCount(device.id, device.click_to_link)} className="body_btn">Написать продавцу {
                              adaptiveBtn
                                ? <span>{device.price} &#8381;</span>
                                : ''
                            }
                            </a>
                            : <div className='devicePage_product_is_out product_is_out'>
                              <span>Нет в наличии</span>
                            </div>

                        }

                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="devicePage_description">
                {
                  device.product_availability && modalActive
                    ? <div className="info_check_mark_label">
                      <span>Есть в наличии</span>
                    </div>
                    : null
                }

                <div className="devicePage_description_title"><h2>Описание</h2></div>
                <div className="devicePage_description_body">
                  <div className="devicePage_sub_description">
                    {
                      device.description
                        ? <span>{device.description}</span>
                        : <span>По данному товару нет информации &#128542;</span>
                    }
                  </div>

                </div>
              </div>


            </div>
          ))
        }
        {
          modalActive &&
          <div>
            {
              infoDevice.length > 0
                ? <div className="devicePage_info">
                  <div className="title_info">Характеристики</div>
                  <table className='devicePage_table'>

                    <tbody>
                      {
                        infoDevice.map(item => (
                          <tr key={item.id}>
                            <td className='devicePage_td devicePage_td_label'><span>{item.title}</span></td>
                            <td className='devicePage_td devicePage_td_info'><span>{item.description}</span></td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                </div>
                : null
            }

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

          </div>

        }


        <RecommendList
          recommended={recommended}
        />


      </div>
    </div>

  )
}
