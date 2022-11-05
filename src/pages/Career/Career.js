import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHirings } from '../../store/action'
import { Table } from 'antd'
import { getDeviceType } from '../../utils'
import Button from '../../components/Button'
import xlsx from 'json-as-xlsx'
import moment from 'moment'

export default function Career() {
  const device = getDeviceType()
  const dispatch = useDispatch()
  const {hirings} = useSelector(s => s)
  const isDesktop = device === 'desktop'
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
    { dataIndex: "idx", title: "No.", width: isDesktop ? '5rem' : '72px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "nickname", title: "Panggilan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "email", title: "Email", width: isDesktop ? '15rem' : '240px' },
    { dataIndex: "phone", title: "Nomor HP", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "address", title: "Alamat", width: isDesktop ? '15rem' : '240px', ellipsis: true },
    { dataIndex: "workingHour", title: "Waktu Kerja", width: isDesktop ? '10rem' : '160px', filters: workingHourFilter, onFilter: workingHourOnFilter },
    { dataIndex: "camera", title: "Kamera", width: isDesktop ? '8rem' : '128px', ellipsis: true },
    { dataIndex: "lens", title: "Lensa", width: isDesktop ? '8rem' : '128px', ellipsis: true },
    { dataIndex: "accessories", title: "Aksesoris", width: isDesktop ? '8rem' : '128px', ellipsis: true },
    { dataIndex: "cv", title: "Link CV", width: isDesktop ? '10rem' : '160px', render: renderLink },
    { dataIndex: "portfolio", title: "Link Portfolio", width: isDesktop ? '10rem' : '160px', render: renderLink },
    { dataIndex: "fee", title: "Fee", width: isDesktop ? '10rem' : '160px', filters: feeFilters, onFilter: feeOnFilter },
    { dataIndex: "experience", title: "Pengalaman", width: isDesktop ? '20rem' : '240px', ellipsis: true },
  ]

  const downloadXlsx = () => {
    const data = [{
      sheet: 'Candidate',
      columns: [
        {label: 'No.', value: (row) => row.idx},
        {label: 'Nama Lengkap', value: 'fullname'},
        {label: 'Nama Panggilan', value: 'nickname'},
        {label: 'Email', value: 'email'},
        {label: 'No. Whatsapp', value: row => row.phone ? `'${row.phone}` : ''},
        {label: 'Alamat', value: 'address'},
        {label: 'Waktu Kerja', value: 'workingHour'},
        {label: 'Kamera', value: 'camera'},
        {label: 'Lensa', value: 'lens'},
        {label: 'Aksesoris', value: 'accessories'},
        {label: 'Link CV', value: 'cv'},
        {label: 'Link Portfolio', value: 'portfolio'},
        {label: 'Fee', value: 'fee'},
        {label: 'Pengalaman', value: 'experience'},
        {label: 'Tanggal Submit', value: row => moment(row.createdAt).format('YYYY-MM-DD')}
      ],
      content: hirings.data
    }]
    xlsx(data, {
      fileName: `${moment().format('YYYYMMDD')}-Candidate`,
    })
  }

  return (
    <section className={styles.root}>
      <h1>List Kandidat</h1>
      <Button 
        className={styles.buttonDownload} 
        handleClick={downloadXlsx} 
        variant="active-square"
        disabled={!hirings.data}
      >
        Download Excel
      </Button>
      <Table 
        dataSource={hirings.data ? hirings.data : []}
        columns={columnsTable}
        pagination={{position: ['bottomLeft'], pageSize: isDesktop ? 10 : 5, showSizeChanger: false}}
        scroll={{y: 'fit-content'}}
      />
    </section>
  )
}
