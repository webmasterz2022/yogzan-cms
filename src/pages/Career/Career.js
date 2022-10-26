import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHirings } from '../../store/action'
import { Table } from 'antd'

export default function Career() {
  const dispatch = useDispatch()
  const {hirings} = useSelector(s => s)
  useEffect(() => {
    dispatch(getAllHirings())
    window.scrollTo(0,0)
  }, [])

  const feeFilters = [
    {text: 'Dibawah Rp 200.000', value: 'Dibawah Rp 200.000'},
    {text: 'Rp 200.000 - Rp 250.000', value: 'Rp 200.000 - Rp 250.000'},
    {text: 'Rp 250.000 - Rp 300.000', value: 'Rp 250.000 - Rp 300.000'},
    {text: 'Rp 300.000 - Rp 350.000', value: 'Rp 300.000 - Rp 350.000'},
    {text: 'Rp 350.000 - Rp 400.000', value: 'Rp 350.000 - Rp 400.000'},
    {text: 'Rp 450.000 - Rp 500.000', value: 'Rp 450.000 - Rp 500.000'},
    {text: 'Diatas Rp 500.000', value: 'Diatas Rp 500.000'},
  ]
  const feeOnFilter = (value, record) => record.fee.indexOf(value) === 0
  const workingHourFilter = [
    {text: 'Weekdays', value: 'Weekdays'},
    {text: 'Weekend', value: 'Weekend'},
    {text: 'Weekdays & Weekend', value: 'Weekdays & Weekend'},
  ]
  const workingHourOnFilter = (value, record) => record.workingHour.indexOf(value) === 0
  const reqLink = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  const isLink = value => reqLink.test(value)
  const renderLink = val => isLink(val) ? <a href={val} target="_blank" rel="noreferrer">{val}</a> : val
  
  const columnsTable = [
    { dataIndex: "idx", title: "No.", width: '5rem', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama", width: '10rem', fixed: 'left' },
    { dataIndex: "nickname", title: "Panggilan", width: '8rem' },
    { dataIndex: "email", title: "Email", width: '15rem' },
    { dataIndex: "phone", title: "Nomor HP", width: '8rem' },
    { dataIndex: "address", title: "Alamat", width: '15rem', ellipsis: true },
    { dataIndex: "workingHour", title: "Waktu Kerja", width: '10rem', filters: workingHourFilter, onFilter: workingHourOnFilter },
    { dataIndex: "camera", title: "Kamera", width: '8rem', ellipsis: true },
    { dataIndex: "lens", title: "Lensa", width: '8rem', ellipsis: true },
    { dataIndex: "accessories", title: "Aksesoris", width: '8rem', ellipsis: true },
    { dataIndex: "cv", title: "Link CV", width: '10rem', render: renderLink },
    { dataIndex: "portfolio", title: "Link Portfolio", width: '10rem', render: renderLink },
    { dataIndex: "fee", title: "Fee", width: '10rem', filters: feeFilters, onFilter: feeOnFilter },
    { dataIndex: "experience", title: "Pengalaman", width: '20rem', ellipsis: true },
  ]

  return (
    <section className={styles.root}>
      <Table 
        dataSource={hirings.data ? hirings.data.map((e, i) => ({...e, idx: i+1})) : []}
        columns={columnsTable}
        pagination={{position: ['bottomLeft'], pageSize: 10}}
        scroll={{y: '28rem'}}
      />
    </section>
  )
}
