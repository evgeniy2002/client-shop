import React from 'react'
import s from './SortPopap.module.css'


export default React.memo(function SortPopap({ items, activeSortBy, onClickItem }) {

  let currentSortBy = items.find(item => item.type == activeSortBy.type).name;

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutSideClick)
  }, [])

  const [visiblePopup, setVisiblePopap] = React.useState(false)

  const sortRef = React.useRef()

  const toggleVisiblePopap = () => {
    setVisiblePopap(!visiblePopup)
  }

  const handleOutSideClick = (e) => {
    if (!e.path.includes(sortRef.current)) {
      setVisiblePopap(false)
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
