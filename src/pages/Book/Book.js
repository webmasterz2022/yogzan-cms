import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import moment from 'moment'

export default function Book() {
  moment.locale()
  const dispatch = useDispatch()
  const {bookings, categories} = useSelector(s => s)

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(getAllBookings())
    dispatch(getAllCategories())
  }, [])
  const serviceFilter = categories.map(e => ({text: e.name, value: e.name}))
  const serviceOnFilter = (value, record) => record.layanan?.indexOf(value) === 0

  const renderDate = val => moment(val).isValid() ? moment(val).format('DD MMM YYYY') : <span className={styles.error}>{val}</span>
  
  const columnsTable = [
    { dataIndex: "idx", title: "No.", width: '4rem', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "name", title: "Nama", width: '10rem', fixed: 'left' },
    { dataIndex: "layanan", title: "Layanan", width: '8rem' },
    { dataIndex: "city", title: "Kota", width: '8rem' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: '8rem', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: '8rem' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: '8rem', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '8rem', render: renderDate },
  ]

  return (
    <section className={styles.root}>
      <Table 
        dataSource={bookings.data ? bookings.data.map((e, i) => ({...e, idx: i+1})) : []}
        columns={columnsTable}
        pagination={{position: ['bottomLeft'], pageSize: 10}}
        scroll={{y: '28rem'}}
      />
    </section>
  )
}
