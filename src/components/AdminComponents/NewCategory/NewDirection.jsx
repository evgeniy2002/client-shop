import React from 'react';


import { Field, reduxForm } from 'redux-form'


import '../Admin.css'
import { changeInfoCategoty, createType, deleteType, getAllTypes } from '../../../http/deviceApi';



function NewCategory(props) {

 
  const [allCategory, setAllCategory] = React.useState([])

  const [inputName, setName] = React.useState('')
  const [oldName, setOldName] = React.useState('')
  const [newName, setNewName] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [changeFile, setChangeFile] = React.useState(null)
  const [currentCategory, setCategory] = React.useState('')

  const selectFile = e => {
    setFile(e.target.files[0])
  }
  const selectChangeFile = e => {
    setChangeFile(e.target.files[0])
  }
  React.useEffect(() => {
    getAllTypes()
      .then((type) => setAllCategory(type.data))
  }, [])


  const deleteCategory = () => {
    let deleteId = allCategory.find(item => item.type_name === currentCategory).id

    deleteType(deleteId)
      .then(() => {
        alert('Категория ' + currentCategory + ' была удалена успешно')
      })
      .catch(() => {
        alert('Произошла ошибка')
      })
  }


  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', inputName)
    formData.append('img', file)

    createType(formData)
      .then(() => {
        alert('Успешно добавлено')
      
      })
      .catch(err => {
        alert('Упс, произошла ошибка')
        console.log(err)
      })

  }
  const changeCategory = () => {
    const formData = new FormData()
    formData.append('oldName', oldName)
    formData.append('newName', newName)
    formData.append('img', changeFile)

    changeInfoCategoty(formData)
      .then(() => {
        alert('Успешно изменено')
        
      })
      .catch(err => {
        alert('Упс, произошла ошибка')
        console.log(err)
      })

  }


  return (
    <div className='new_category'>


      <div className="title">
        Новая категория
      </div>



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

          <button className='form_btn' onClick={addDevice}>Добавить</button>
        </div>


        <div className="delete_unit">
          <div className="title">Удалить объект</div>

          <div className='form_group'>
            <label className='form_label' for="subcategory">Категории:</label>
            <Field
              id='subcategory'
              component={'select'}
              className='form_group_select header_input'
              name="sumOrder"
              value={currentCategory}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Выбрать категорию</option>

              {allCategory
                ? allCategory.map((item, index) => (
                  <option
                    key={index}
                    className='form_select_item'
                    value={item.type_name}
                  >
                    {item.type_name}
                  </option>
                ))
                : ''
              }
            </Field>
          </div>

          <button className='form_btn delete_btn' onClick={deleteCategory}>Удалить</button>
        </div>

        <div className="edit_unit">
        
          <div className="title">Редактор категорий</div>

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
            <label className='form_label' for="change_file">Изменить изображение</label>

            <input
              type="file"
              id="change_file"
              name='change_file'
              onChange={selectChangeFile}
              className='header_input'
            />

          </div>

          <button className='form_btn change_btn' onClick={changeCategory}>Редактировать</button>
        
        </div>

      </form >


    </div >
  )
}

let ReduxNewCategoryForm = reduxForm({ form: 'NewCategoryForm' })(NewCategory)

export default ReduxNewCategoryForm;
