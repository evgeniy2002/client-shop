import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { changeDeviceInfo, createDevice, deleteDevice, getAllBrand } from '../../../http/deviceApi';
import '../Admin.css'

const NewDevice = (props) => {

  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [popupState, setPopupState] = React.useState(false);


  const [allSubCategory, setAllSubCategory] = React.useState([])

  const [inputName, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [currentSubCategory, setSubCategory] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [linkToVk, setLinkToVk] = React.useState('')
  const [info, setInfo] = React.useState([])
  
  
  const [deleteDeviceName, setDeleteDeviceName] = React.useState('')
  
  
  const [oldName, setOldName] = React.useState('')
  const [newPrice, setNewPrice] = React.useState('')
  const [newDescription, setNewDescription] = React.useState('')
  const [newName, setNewName] = React.useState('')
  const [changeFile, setChangeFile] = React.useState(null)
  const [availabilityDeviceName, setAvailabilityDeviceName] = React.useState('')
  const [newLinkToVk, setNewLinkToVk] = React.useState('')

  React.useEffect(() => {
    getAllBrand()
      .then((brand) => setAllSubCategory(brand.data))

  }, [])


  const addInfo = () => {
    setInfo([...info, { id: ++info.length, title: '', description: '' }])
  }

  const deleteInfoItem = (id) => {
    setInfo(info.filter(i => i.id !== id))
  }

  const changeInfoItem = (id, value, key) => {
    setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))
  }

  const changePopupState = () => {
    setPopupState(!popupState)
  }

  const selectChangeFile = e => {
    setChangeFile(e.target.files[0])
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }
  const changeInfoDevice = () => {
    const formData = new FormData()
    formData.append('oldName', oldName)
    formData.append('newName', newName)
    formData.append('newPrice', newPrice)
    formData.append('img', changeFile)
    formData.append('newDesc', newDescription)
    formData.append('availabelProduct', availabilityDeviceName)
    formData.append('newLinkVk', newLinkToVk)
    formData.append('updateInfo', JSON.stringify(info))


    changeDeviceInfo(formData)
      .then(data => {
        alert('Успешно изменено')

      })
      .catch(err => {
        alert('Упс, произошла ошибка')
        console.log(err)
      })
  }

  const addDevice = () => {

    let brandId = allSubCategory.find(item => item.brands_name === currentSubCategory).id


    const formData = new FormData()
    formData.append('name', inputName)
    formData.append('price', price)
    formData.append('img', file)
    formData.append('brandId', brandId)
    formData.append('desc', description)
    formData.append('link_to_vk', linkToVk)
    formData.append('info_device', JSON.stringify(info))

    createDevice(formData)
      .then(data => {
        alert('Успешно добавлено')
      })
      .catch(err => {
        alert('Упс, произошла ошибка')
        console.log(err)
      })

  }



  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
    setCheckedTwo(false);
    setDeleteDeviceName('')
    console.log(deleteDeviceName)
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
    setCheckedOne(false);

  };
  
  const handleDevice = () => {
    let brandId = allSubCategory.find(item => item.brands_name === currentSubCategory).id


    deleteDevice(brandId, deleteDeviceName, checkedOne)
      .then(data => {
        if (checkedOne) {
          alert(`Все товары из ${currentSubCategory} удалены`)
        } else {

          alert(`Товар ${deleteDeviceName} удален из списка`)
        }

      })
      .catch(err => {
        alert('Упс, произошла ошибка')

      })

  }

  return (
    <div className='sub_category'>
      <div className="title">Новый товар</div>

      <form onSubmit={props.handleSubmit} className='form'>

        <div className="add_unit">
          <div className='form_group'>
            <label className='form_label' for="newcategory">Название:</label>
            <Field
              id="newcategory"
              component={'input'}
              type="text"
              name="name"
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={inputName}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label className='form_label' for="price">Цена:</label>
            <Field
              id="price"
              component={'input'}
              type={"text"}
              name='price'
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />

          </div>
          <div className="form_group">
            <label className='form_label' for="textarea">Описание:</label>
            <Field
              id="textarea"
              component={'textarea'}
              type={"text"}
              name='textarea'
              className='header_input textarea_input'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

          </div>


          <div className='form_group'>
            <label className='form_label' for="subcategory">Подкатегории:</label>
            <Field
              id='subcategory'
              component={'select'}
              className='form_group_select header_input'
              name="sumOrder"
              value={currentSubCategory}
              onChange={e => setSubCategory(e.target.value)}
            >
              <option value="">Выбрать подкатегорию</option>

              {allSubCategory
                ? allSubCategory.map((item, index) => (
                  <option
                    key={index}
                    className='form_select_item'
                    value={item.type_name}
                  >
                    {item.brands_name}
                  </option>
                ))
                : ''
              }
            </Field>
          </div>

          <div className='form_group'>
            <label className='form_label' for="file">Добавить изображение</label>

            <input
              type="file"
              id="file"
              name='file'
              onChange={selectFile}
              className='header_input'
            />

          </div>
          <div className='form_group'>
            <label className='form_label' for="info">Новое свойство</label>
            <button onClick={changePopupState}>Добавить новое свойство</button>
            {/* <label className='form_label' for="info">Добавить новое свойство</label> */}

            {
              popupState
              && <ul className="list_property">

                <button className='close_list' onClick={changePopupState}>X</button>
                {
                  info.map(item => (
                    <div className="list_property_item" key={item.id}>
                      <input type='text'
                        value={item.title}
                        onChange={(e) => changeInfoItem(item.id, e.target.value, 'title')}
                        placeholder='Название свойства'
                        className='list_input'
                      />
                      <input type='text'
                        value={item.description}
                        onChange={(e) => changeInfoItem(item.id, e.target.value, 'description')}
                        placeholder='Описание свойства'
                        className='list_input'
                      />

                      <button className="delete_property_item" onClick={() => deleteInfoItem(item.id)}>Удалить</button>
                    </div>

                  ))
                }
                <button className='add_new_item' onClick={addInfo}>Добавить</button>
              </ul>
            }



          </div>
          <div className="form_group">
            <label for='link_to_vk' className='form_label'>Ссылка на вк</label>
            <Field
              id="link_to_vk"
              component={'input'}
              type={"text"}
              name='link_to_vk'
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={linkToVk}
              onChange={e => setLinkToVk(e.target.value)}
            />
          </div>


          <button className='form_btn' onClick={addDevice}>Добавить</button>


        </div>

        <div className="delete_unit">
          <div className="title">Удалить объект</div>

          <div className='form_group'>
            <label className='form_label' for="delete_sub">Подкатегории:</label>
            <Field
              id='delete_sub'
              component={'select'}
              className='form_group_select header_input'
              name="delete_sub"
              value={currentSubCategory}
              onChange={e => setSubCategory(e.target.value)}
            >
              <option value="">Выбрать подкатегорию</option>

              {allSubCategory
                ? allSubCategory.map((item, index) => (
                  <option
                    key={index}
                    className='form_select_item'
                    value={item.brands_name}
                  >
                    {item.brands_name}
                  </option>
                ))
                : ''
              }
            </Field>
          </div>

          <div className='form_group'>
            <Field
              component={'input'}
              className={checkedOne ? 'custom_checkbox active' : 'custom_checkbox'}
              type={'checkbox'}
              name={'delete_all_device'}
              id={'delete_all_device'}
              value={checkedOne}
              onChange={handleChangeOne}
            />
            <label for='delete_all_device' className='form_group_label'>Удалить все товары </label>
          </div>

          <div className='form_group'>
            <Field
              component={'input'}
              className={checkedTwo ? 'custom_checkbox active' : 'custom_checkbox'}
              type={'checkbox'}
              name={'delete_seized_device'}
              id={'delete_seized_device'}
              value={checkedTwo}
              onChange={handleChangeTwo}
            />
            <label for='delete_seized_device' className='form_group_label'>Удалить определенный товар</label>
          </div>

          {
            checkedTwo
              ? <div className="form_group">
                <label className='form_label' for="delete_device">Название товара:</label>
                <Field
                  id="delete_device"
                  component={'input'}
                  type={"text"}
                  name='delete_device'
                  className='header_input'
                  autoCapitalize={'off'}
                  autoComplete={'off'}
                  value={deleteDeviceName}
                  onChange={e => setDeleteDeviceName(e.target.value)}
                />

              </div>

              : null
          }


          <button className='form_btn delete_btn' onClick={handleDevice}>Удалить</button>
        </div>

        <div className="edit_unit">

          <div className="title">Редактор товаров</div>

          <div className='form_group'>
            <label className='form_label' for="old_name">Старое название товара, которое надо заменить (Обязательно перед каждым обновлением информации о товаре!)</label>
            <Field
              id="old_name"
              component={'input'}
              type="text"
              name="old_name"
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={oldName}
              onChange={e => setOldName(e.target.value)}
            />

          </div>
          <div className='form_group'>
            <label className='form_label' for="new_name">Новое название</label>
            <Field
              id="new_name"
              component={'input'}
              type="text"
              name="new_name"
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />

          </div>
          <div className='form_group'>
            <label className='form_label' for="new_price">Новая цена</label>
            <Field
              id="new_price"
              component={'input'}
              type="text"
              name="new_price"
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
            />

          </div>
          <div className="form_group">
            <label className='form_label' for="new_textarea">Изменить описание:</label>
            <Field
              id="new_textarea"
              component={'textarea'}
              type={"text"}
              name='new_textarea'
              className='header_input textarea_input'
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />

          </div>
          <div className='form_group'>
            <label className='form_label' for="change_file">Изменить изображение</label>

            <input
              type="file"
              id="change_file"
              name='change_file'
              onChange={selectChangeFile}
              className='header_input'
            />

          </div>
          <div className='form_group'>
            <label className='form_label'>обновить свойство</label>
            <button onClick={changePopupState}>обновить свойство продукта</button>
         

            {
              popupState
              && <ul className="list_property">

                <button className='close_list' onClick={changePopupState}>X</button>
                {
                  info.map(item => (
                    <div className="list_property_item" key={item.id}>
                      <input type='text'
                        value={item.title}
                        onChange={(e) => changeInfoItem(item.id, e.target.value, 'title')}
                        placeholder='Название свойства'
                        className='list_input'
                      />
                      <input type='text'
                        value={item.description}
                        onChange={(e) => changeInfoItem(item.id, e.target.value, 'description')}
                        placeholder='Описание свойства'
                        className='list_input'
                      />

                      <button className="delete_property_item" onClick={() => deleteInfoItem(item.id)}>Удалить</button>
                    </div>

                  ))
                }
                <button className='add_new_item' onClick={addInfo}>Добавить</button>
              </ul>
            }



          </div>
          <div className="form_group">
            <label for='product_availability' className='form_label'>Наличие товара (есть | нет)</label>
            <Field
              id="product_availability"
              component={'input'}
              type={"text"}
              name='product_availability'
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={availabilityDeviceName}
              onChange={e => setAvailabilityDeviceName(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label for='change_link_to_vk' className='form_label'>Изменить ссылку на вк</label>
            <Field
              id="change_link_to_vk"
              component={'input'}
              type={"text"}
              name='change_link_to_vk'
              className='header_input'
              autoCapitalize={'off'}
              autoComplete={'off'}
              value={newLinkToVk}
              onChange={e => setNewLinkToVk(e.target.value)}
            />
          </div>

          {/* <Field
              component={'input'}
              className={checkedTwo ? 'custom_checkbox active' : 'custom_checkbox'}
              type={'checkbox'}
              name={'product_availability_editor'}
              id={'product_availability_editor'}
              value={checkedTwo}
              onChange={handleChangeTwo}
            /> */}

          <button className='form_btn change_btn' onClick={changeInfoDevice}>Редактировать</button>

        </div>

        {/* <div className="title">Наличие товара</div>
          

          <Field
            component={'input'}
            className={checkedTwo ? 'custom_checkbox active' : 'custom_checkbox'}
            type={'checkbox'}
            name={'delete_seized_device'}
            id={'delete_seized_device'}
            value={checkedTwo}
            onChange={handleChangeTwo}
          />
          <label for='delete_seized_device' className='form_group_label'>Наличие товара</label> */}

      </form >
    </div>
  )
};

let ReduxNewDeviceForm = reduxForm({ form: 'NewCategoryForm' })(NewDevice)


export default ReduxNewDeviceForm;
