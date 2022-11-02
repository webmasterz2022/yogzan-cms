import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories, getAllFixBookings } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import moment from 'moment'
import ButtonFIlter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import { getDeviceType } from '../../utils'

export default function Book() {
  moment.locale()
  const device = getDeviceType()
  const isDesktop = device === 'desktop'
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
    { dataIndex: "idx", title: "No.", width: isDesktop ? '4rem' : '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "name", title: "Nama", width: isDesktop ? '10rem' : '160px', fixed: 'left' },
    { dataIndex: "layanan", title: "Layanan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "city", title: "Kota", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: isDesktop ? '8rem' : '128px', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: isDesktop ? '8rem' : '128px', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '8rem' : '128px', render: renderDate },
  ]

  const columnsTableFixBooking = [
    { dataIndex: "idx", title: "No.", width: isDesktop ? '4rem' : '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama Lengkap", width: isDesktop ? '10rem' : '160px', fixed: 'left' },
    { dataIndex: "date", title: "Tanggal", width: isDesktop ? '8rem' : '128px', render: renderDate, fixed: 'left' },
    { dataIndex: "time", title: "Waktu", width: isDesktop ? '5rem' : '72px' },
    { dataIndex: "nickname", title: "Nama Panggilan", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "layanan", title: "Layanan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "campus", title: "Asal Kampus", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "faculty", title: "Fakultas / Jurusan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "ig", title: "Akun Instagram", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "ig-mua", title: "Instagram MUA", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "ig-attire", title: "Instagram Attire", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "phone", title: "No. Whatsapp", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "location", title: "Lokasi Pemotretan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '8rem' : '128px', render: renderDate },
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
        pagination={{position: ['bottomLeft'], pageSize: isDesktop ? 10 : 5}}
        scroll={{y: 'fit-content'}}
      />
    </section>
  )
}
