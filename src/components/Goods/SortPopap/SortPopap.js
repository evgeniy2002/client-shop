import React from 'react'
import s from './SortPopap.module.css'


export default React.memo(function SortPopap({ items, activeSortBy, onClickItem }) {

  let currentSortBy = items.find(item => item.type == activeSortBy.type).name;

  const body = document.querySelector('body')

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutSideClick)
  }, [])

  const [visiblePopup, setVisiblePopap] = React.useState(false)

  const sortRef = React.useRef()

  const toggleVisiblePopap = (event) => {
    setVisiblePopap(!visiblePopup)
    console.log(event.target)
    // body.classList.toggle('lock')
  }

  const handleOutSideClick = (e) => {
    if (!e.path.includes(sortRef.current)) {
      setVisiblePopap(false)
      // body.classList.toggle('lock')
    }
  }

  const onSelectItem = React.useCallback((obj) => {
    if (onClickItem) {
      onClickItem(obj)
    }
    setVisiblePopap(false)

  }, [])
  return (
    <div ref={sortRef} className={visiblePopup ? s.sort + ' ' + s.active : s.sort} onClick={toggleVisiblePopap}>
      <div className={s.sort__label}>
        <div className={s.sort_current}>
          {currentSortBy}
        </div>

        {/* <svg
          className={visiblePopup ? s.disabled_rotated + ' ' + s.rotated : s.disabled_rotated}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg> */}


      </div>

      {visiblePopup &&
        <div className={visiblePopup ? s.sort__popup_active : s.sort_popup}>
          <ul>
            {items && items.map((obj, index) => (
              <li
                onClick={() => onSelectItem(obj)}
                className={s.sort_popup_item}
                key={`${obj.type},${index}`}
              >{obj.name}</li>
            ))}
          </ul>
        </div>
      }

    </div>
  )
})
