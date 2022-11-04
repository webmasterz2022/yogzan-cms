import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories, getAllFixBookings, updateFixBooking } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form } from 'antd'
import moment from 'moment'
import ButtonFIlter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import { getDeviceType } from '../../utils'
import Input from '../../components/Input'
import Button from '../../components/Button'
import exportFromJson from 'export-from-json'

export default function Book() {
  moment.locale()
  const device = getDeviceType()
  const isDesktop = device === 'desktop'
  const dispatch = useDispatch()
  const {bookings, categories, fixBookings, isLoading} = useSelector(s => s)
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const [form, setForm] = useState();
  const edit = (record) => {
    console.log(record)
    setForm(record);
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey('');
    setForm({})
  };
  const simpan = () => {
    dispatch(updateFixBooking(form, cancel))
  }

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
    { dataIndex: "name", title: "Nama", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "layanan", title: "Layanan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "city", title: "Kota", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: isDesktop ? '15rem' : '240px', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: isDesktop ? '15rem' : '240px', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '8rem' : '128px', render: renderDate },
  ]

  const columnsTableFixBooking = [
    { dataIndex: "idx", title: "No.", width: isDesktop ? '4rem' : '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama Lengkap", width: isDesktop ? '10rem' : '160px', editable: true },
    { dataIndex: "nickname", title: "Nama Panggilan", width: isDesktop ? '10rem' : '160px', editable: true },
    { dataIndex: "date", title: "Tanggal", width: isDesktop ? '8rem' : '160px', render: renderDate, editable: true },
    { dataIndex: "time", title: "Waktu", width: isDesktop ? '5rem' : '128px', editable: true },
    { dataIndex: "layanan", title: "Layanan", width: isDesktop ? '8rem' : '128px', editable: true },
    { dataIndex: "campus", title: "Asal Kampus", width: isDesktop ? '8rem' : '128px', editable: true },
    { dataIndex: "faculty", title: "Fakultas / Jurusan", width: isDesktop ? '12.5rem' : '200px', editable: true },
    { dataIndex: "ig", title: "Akun Instagram", width: isDesktop ? '12.5rem' : '200px', editable: true },
    { dataIndex: "ig-mua", title: "Instagram MUA", width: isDesktop ? '12.5rem' : '200px', editable: true },
    { dataIndex: "ig-attire", title: "Instagram Attire", width: isDesktop ? '12.5rem' : '200px', editable: true },
    { dataIndex: "phone", title: "No. Whatsapp", width: isDesktop ? '10rem' : '160px', editable: true },
    { dataIndex: "location", title: "Lokasi Pemotretan", width: isDesktop ? '12.5rem' : '200px', editable: true },
    { dataIndex: "package", title: 'Jenis Paket', width: isDesktop ? '8rem' : '128px', editable: true},
    { dataIndex: "photographer", title: 'Fotografer', width: isDesktop ? '10rem' : '160px', editable: true},
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '10rem' : '160px', render: renderDate },
    { title: 'Action', width: isDesktop ? '15rem' : '240px',render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <div className={styles.actionButtons}>
          <Button variant="active-square" handleClick={simpan} disabled={isLoading[`updateFixBooking-${record._id}`]}>Simpan</Button>
          <Button handleClick={() => cancel()}>Batal</Button>
        </div>
      ) : (
        <Button variant="active-square" disabled={editingKey !== ''} handleClick={() => edit(record)}>
          Edit
        </Button>
      );
    } }
  ]

  const dataBooking = type === 'Booking' ? bookings : fixBookings
  const columnsTable = type === 'Booking' ? columnsTableBooking : columnsTableFixBooking

  const mergedColumns = columnsTable.map((col) => {
    if (!col.editable) {
      return col;
    }
    let type
    if(col.dataIndex === "date" || col.dataIndex === 'time'){
      type = col.dataIndex
    } else {
      type = 'text'
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        form,
        setForm
      }),
    };
  });
  
  const downloadExcel = () => {
    let data
    if(type === 'Fix Booking'){
      data = fixBookings.data.map((el, i) => ({
        'No.': i+1,
        'Nama Lengkap': el.fullname,
        'Nama Panggilan': el.nickname,
        'Layanan Dipilih': el.layanan,
        'Paket Dipilih': el.package,
        'Fotografer': el.photographer,
        'Tanggal Pemotretan': moment(el.date).isValid() ? moment(el.date).format('dddd, DD MMM YYYY') : el.date,
        'Waktu Pemotretan': el.time,
        'Asal Kampus': el.campus,
        'Fakultas / Jurusan': el.faculty,
        'Akun Instagram': el.ig,
        'Intagram MUA': el['ig-mua'],
        'Instagram Attire': el['ig-attire'],
        'No. Whatsapp': el.phone ? `'${el.phone}` : '',
        'Lokasi Pemotretan': el.location,
        'Tanggal Submit': moment(el.createdAt).format('dddd, DD MMM YYYY')
      }))
    } else {
      data = bookings.data.map((el, i) => ({
        'No.': i+1,
        'Nama': el.name,
        'Layanan Dipilih': el.layanan,
        'Kota': el.city,
        'Tanggal Pemotretan': moment(el.date).isValid() ? moment(el.date).format('dddd, DD MMM YYYY') : el.date,
        'No. Whatsapp': el.phone ? `'${el.phone}` : '',
        'Mengetahui Yogzan Dari': el.knowFrom,
        'Tanggal Submit': moment(el.createdAt).format('dddd, DD MMM YYYY')
      }))
    }
    exportFromJson({
      data,
      fileName: `${moment().format('YYYYMMDD')}-${type}`,
      exportType: 'xls'
    })
  }

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
      <Button 
        className={styles.buttonDownload} 
        handleClick={downloadExcel} 
        variant="active-square"
        disabled={!dataBooking.data}
      >
        Download Excel
      </Button>
      <Table 
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={dataBooking.data ? dataBooking.data.map((e, i) => ({...e, idx: i+1})) : []}
        columns={mergedColumns}
        pagination={{position: ['bottomLeft'], pageSize: isDesktop ? 10 : 5}}
        scroll={{y: 'fit-content'}}
      />
    </section>
  )
}

const EditableCell = (props) => {
  const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    form,
    setForm,
    ...restProps
  } = props

  const inputProps = editing ? {
    value: inputType === 'date' ? moment(form[dataIndex]).format('YYYY-MM-DD') : form[dataIndex] || '',
    onChange: e => setForm(prev => ({...prev, [dataIndex]: e.target.value})),
    type: inputType
  } : {}
  
  return (
    <td {...restProps}>
      {editing ? 
        <Input 
          meta={{}}
          input={inputProps}
        /> : children || ''}
    </td>
  );
}
