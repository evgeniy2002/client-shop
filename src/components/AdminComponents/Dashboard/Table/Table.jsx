import React from 'react';
import s from './Table.module.css'

const Table = props => {
  return (
    <div>
      <div className={s.table_wrapper}>
        <table>
          {
            props.headData ? (
              <thead>
                <tr>
                  {
                    props.headData.map((item, index) => (
                      props.renderHead(item,index)
                    ))
                  }
                </tr>
              </thead>
            ) : null
          }
          {
            props.bodyData ? (
              <tbody>
                {
                  props.bodyData.map((item,index) => (
                    props.renderBody(item, index)
                  ))
                }
              </tbody>
            ) : null
          }
        </table>
      </div>
    </div>
  )
}

export default Table;
