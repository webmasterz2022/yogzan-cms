import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories, getAllFixBookings } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import moment from 'moment'
import ButtonFIlter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'

export default function Book() {
  moment.locale()
  const dispatch = useDispatch()
  const {bookings, categories, fixBookings} = useSelector(s => s)
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')

  const bookingTypes = [{name: 'Booking'}, {name: 'Fix Booking'}]

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(getAllCategories())
    if(!type){
      setSearchParams({type: 'Booking'})
    }
  }, [])
  
  useEffect(() => {
    if(type === 'Booking'){
      dispatch(getAllBookings())
    }
    if(type === 'Fix Booking'){
      dispatch(getAllFixBookings())
    }
  }, [type])
  // const serviceFilter = categories.map(e => ({text: e.name, value: e.name}))
  // const serviceOnFilter = (value, record) => record.layanan?.indexOf(value) === 0

  const renderDate = val => moment(val).isValid() ? moment(val).format('DD MMM YYYY') : <span className={styles.error}>{val}</span>
  
  const columnsTableBooking = [
    { dataIndex: "idx", title: "No.", width: '4rem', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "name", title: "Nama", width: '10rem', fixed: 'left' },
    { dataIndex: "layanan", title: "Layanan", width: '8rem' },
    { dataIndex: "city", title: "Kota", width: '8rem' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: '8rem', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: '8rem' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: '8rem', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '8rem', render: renderDate },
  ]

  const columnsTableFixBooking = [
    { dataIndex: "idx", title: "No.", width: '4rem', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama Lengkap", width: '10rem', fixed: 'left' },
    { dataIndex: "date", title: "Tanggal", width: '8rem', render: renderDate, fixed: 'left' },
    { dataIndex: "time", title: "Waktu", width: '5rem', fixed: 'left' },
    { dataIndex: "nickname", title: "Nama Panggilan", width: '10rem' },
    { dataIndex: "layanan", title: "Layanan", width: '8rem' },
    { dataIndex: "campus", title: "Asal Kampus", width: '8rem' },
    { dataIndex: "faculty", title: "Fakultas / Jurusan", width: '8rem' },
    { dataIndex: "ig", title: "Akun Instagram", width: '8rem' },
    { dataIndex: "ig-mua", title: "Instagram MUA", width: '8rem' },
    { dataIndex: "ig-attire", title: "Instagram Attire", width: '8rem' },
    { dataIndex: "phone", title: "No. Whatsapp", width: '8rem' },
    { dataIndex: "location", title: "Lokasi Pemotretan", width: '8rem' },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '8rem', render: renderDate },
  ]

  const dataBooking = type === 'Booking' ? bookings : fixBookings
  const columnsTable = type === 'Booking' ? columnsTableBooking : columnsTableFixBooking

  return (
    <section className={styles.root}>
      <div>
        {bookingTypes.map(e => (
          <ButtonFIlter
            handleClick={() => setSearchParams({type: e.name})}
            key={e.name}
            variant={type === e.name ? 'active' : ''}
          >
            {e.name}
          </ButtonFIlter>
        ))}
      </div>
      <Table 
        dataSource={dataBooking.data ? dataBooking.data.map((e, i) => ({...e, idx: i+1})) : []}
        columns={columnsTable}
        pagination={{position: ['bottomLeft'], pageSize: 10}}
        scroll={{y: 'fit-content'}}
      />
    </section>
  )
}
