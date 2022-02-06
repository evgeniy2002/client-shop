import React from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/reducers/devices-reducer';


export default function Paginate() {
  const dispatch = useDispatch()

  const pages = []
  const { totalCount, limit } = useSelector(({ devices }) => {
    return {
      totalCount: devices.totalCount,
      limit: devices.limit
    }
  })

  const pageCount = Math.ceil(totalCount / limit)

 
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  const setCurrentPage = ({ selected: selectedPage }) => {
    dispatch(setPage(selectedPage + 1))
    console.log(selectedPage + 1)
  }
  return (
    <div>
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={pages.length}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
