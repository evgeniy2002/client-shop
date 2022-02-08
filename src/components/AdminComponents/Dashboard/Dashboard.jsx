import React from 'react';
// import Chart from 'react-apexcharts'


import s from './Dashboard.module.css'
import human from '../../../assets/images/icons/human.svg'
import ruble from '../../../assets/images/icons/ruble.svg'
import Table from './Table/Table';

import '../Admin.css'


const chartOptions = {
  series: [{
    name: 'Online Customers',
    data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
  }, {
    name: 'Store Customers',
    data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
  }],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    },
    dropShadow: {
      enabled: true,
 
    }
  }
}

const topCustomers = {
  head: [
      'Name',
      'Price',
      'Viewers'
  ],
  body: [
      {
          "name": "john doe",
          "price": "490",
          "viewers": "20"
      },
      {
          "name": "frank iva",
          "price": "250",
          "viewers": "20"
      },
      {
          "name": "anthony baker",
          "price": "120",
          "viewers": "30"
      },
      {
          "name": "frank iva",
          "price": "110",
          "viewers": "12"
      },
      {
          "name": "anthony baker",
          "price": "80",
          "viewers": "0"
      }
  ]
}

const renderCusomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
  <tr key={index}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.viewers}</td>
  </tr>
)

function Dashboard() {

  return (
    <div className={s.dashboard}>
      <div className='title'>Dashboard</div>
      <div className={s.dashboard_row}>
        <div className={s.dashboard_columns}>
          <div className={s.dashboard_status_card}>
            <div className={s.dashboard_card_item}>
              <div className={s.dashboard_card_icon}><img src={human} alt="" /></div>
              <div className={s.dashboard_card_info}>
                <h1 className={s.dashboard_card_info_num}>100</h1>
                <div className={s.dashboard_card_info_direction}><span>moved to vk</span></div>
              </div>
            </div>
          </div>
          <div className={s.dashboard_status_card}>
            <div className={s.dashboard_card_item}>
              <div className={s.dashboard_card_icon}><img src={ruble} alt="" /></div>
              <div className={s.dashboard_card_info}>
                <h1 className={s.dashboard_card_info_num}>1200</h1>
                <div className={s.dashboard_card_info_direction}>total income</div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.dashboard_columns}>
          {/* <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type='line'
            height='100%'
            className={s.dashboard_chart}
          /> */}
        </div>
      </div>
      <div className={s.dashboard_body}>
        <div className={s.dashboard_table}>
          <div className={s.dashboard_table_header}>
            <h3>Popular goods</h3>
          </div>
          <div className={s.card_body}>
            <Table 
               headData={topCustomers.head}
               renderHead={(item, index) => renderCusomerHead(item, index)}
               bodyData={topCustomers.body}
               renderBody={(item, index) => renderCusomerBody(item, index)}
           
            />
          </div>
        </div>
        <div className={s.dashboard_table}>
          <div className={s.dashboard_table_header}>
            <h3>Popular goods</h3>
          </div>
          <div className={s.card_body}>
            <Table 
               headData={topCustomers.head}
               renderHead={(item, index) => renderCusomerHead(item, index)}
               bodyData={topCustomers.body}
               renderBody={(item, index) => renderCusomerBody(item, index)}
           
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
