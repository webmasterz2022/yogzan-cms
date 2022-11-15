import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories, getAllFixBookings, updateFixBooking, pathChecker as checkPath } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form } from 'antd'
import moment from 'moment'
import ButtonFIlter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import { getDeviceType } from '../../utils'
import Input from '../../components/Input'
import Button from '../../components/Button'
import xlsx from 'json-as-xlsx'
import spinner from '../../assets/spinner.gif'

export default function Book() {
  moment.locale()
  const device = getDeviceType()
  const isDesktop = device === 'desktop'
  const dispatch = useDispatch()
  const {bookings, fixBookings, isLoading} = useSelector(s => s)
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const [form, setForm] = useState();
  const edit = (record) => {
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

  const renderDate = val => moment(val).isValid() ? moment(val).format('DD MMM YYYY') : <span className={styles.error}>{val}</span>
  const renderDateTime = val => moment(val).isValid() ? moment(val).format('DD MMM YYYY, HH:mm') : <span className={styles.error}>{val}</span>
  
  const reqLink2 = new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#-]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/)
  const reqLink = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  const isLink = value => reqLink2.test(value)
  const renderLink = val => isLink(val) ? <a href={val} target="_blank" rel="noreferrer">{val}</a> : val
  
  const columnsTableBooking = [
    { dataIndex: "idx", title: "No.", width: isDesktop ? '4rem' : '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "name", title: "Nama", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "layanan", title: "Layanan", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "city", title: "Kota", width: isDesktop ? '8rem' : '128px' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: isDesktop ? '15rem' : '240px', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: isDesktop ? '10rem' : '160px' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: isDesktop ? '15rem' : '240px', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '8rem' : '128px', render: renderDateTime },
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
    { dataIndex: "createdAt", title: "Tanggal Submit", width: isDesktop ? '10rem' : '160px', render: renderDateTime },
    { dataIndex: "linkphoto", title: 'Link Client', width: isDesktop ? '20rem' : '320px', editable: true},
    { dataIndex: "stored", title: 'Link Drive', width: isDesktop ? '15rem' : '240px', editable: true, render: renderLink},
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

  const downloadXlsx = () => {
    let data;
    const sheets = {}
    dataBooking.data?.forEach(e => {
      if(e.date) {
        const currentSheet = moment(e.date).isValid() ? moment(e.date).format('YYYY MMMM') : e.date
        if(!sheets[currentSheet]){
          sheets[currentSheet] = []
        }
        sheets[currentSheet].push(e)
      }
    })
    if(type === 'Fix Booking') {
      data = Object.keys(sheets).map(e => ({
        sheet: e,
        columns: [
          {label: 'Nama Lengkap', value: 'fullname'},
          {label: 'Nama Panggilan', value: 'nickname'},
          {label: 'Layanan Dipilih', value: 'layanan'},
          {label: 'Paket Dipilih', value: 'package'},
          {label: 'Fotografer', value: 'photographer'},
          {label: 'Tanggal Pemotretan', value: row => moment(row.date).isValid() ? moment(row.date).format('YYYY-MM-DD') : row.date},
          {label: 'Waktu Pemotretan', value: 'time'},
          {label: 'Asal Kampus', value: 'campus'},
          {label: 'Fakultas / Jurusan', value: 'faculty'},
          {label: 'Akun Instagram', value: 'ig'},
          {label: 'Intagram MUA', value: 'ig-mua'},
          {label: 'Instagram Attire', value: 'ig-attire'},
          {label: 'No. Whatsapp', value: row => row.phone ? `'${row.phone}` : ''},
          {label: 'Lokasi Pemotretan', value: 'location'},
          {label: 'Tanggal Submit', value: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm')},
        ],
        content: sheets[e]
      }))
    } else {
      data = Object.keys(sheets).map(e => ({
        sheet: e,
        columns: [
          {label: 'Nama', value: 'name'},
          {label: 'Layanan Dipilih', value: 'layanan'},
          {label: 'Kota', value: 'city'},
          {label: 'Tanggal Pemotretan', value: row => moment(row.date).isValid() ? moment(row.date).format('YYYY-MM-DD') : row.date},
          {label: 'No. Whatsapp', value: row => row.phone ? `'${row.phone}` : ''},
          {label: 'Mengetahui Yogzan Dari', value: 'knowFrom'},
          {label: 'Tanggal Submit', value: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm')},
        ],
        content: sheets[e]
      }))
    }
    xlsx(data, {
      fileName: `${moment().format('YYYYMMDD')}-${type}`,
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
        handleClick={downloadXlsx} 
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
        pagination={{position: ['bottomLeft'], pageSize: isDesktop ? 10 : 5, showSizeChanger: false}}
        scroll={{y: 'fit-content'}}
      />
    </section>
  )
}

const EditableCell = (props) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(s => s)
  const {pathChecker} = useSelector(s => s)
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
  const [link, setLink] = useState('')

  useEffect(() => {
    let timer
    if(link){
      timer = setTimeout(() => {
        dispatch(checkPath(link, record._id))
      }, 500)
    }
    return () => timer && clearTimeout(timer)
  }, [link])

  const handleChange = e => {
    if(dataIndex === 'linkphoto') {
      setForm(prev => ({...prev, [dataIndex]: e.target.value}))
      setLink(e.target.value)
    } else {
      setForm(prev => ({...prev, [dataIndex]: e.target.value}))
    }
  }

  const inputProps = editing ? {
    value: inputType === 'date' ? moment(form[dataIndex]).format('YYYY-MM-DD') : form[dataIndex] || '',
    onChange: handleChange,
    type: inputType
  } : {}

  const renderField = () => {
    if(dataIndex === 'linkphoto'){
      return (
        <div className={styles.fieldPath}>
          {isLoading[`checkPath-${record._id}`] && <img src={spinner} />}
          <p>https://yogzan.com/result/ </p>
          <Input 
            className={dataIndex === 'linkphoto' && pathChecker[record._id] ? styles.patherror : ''}
            meta={{}}
            input={{
              ...inputProps,
            }}
          />
        </div>
      )
    } else {
      return (
        <Input 
          className={dataIndex === 'linkphoto' && pathChecker[record._id] ? styles.patherror : ''}
          meta={{}}
          input={{...inputProps, placeholder: dataIndex === 'linkphoto' ? 'https://yogzan.com/result/XXXXX' : ''}}
        />
      )
    }
  }

  const renderValue = () => {
    console.log(dataIndex, children)
    if(dataIndex === 'linkphoto' && children[1]){
      const url = `https://yogzan.com/result/${children[1]}`
      return <a href={url} target={'_blank'} rel="noreferrer">{url}</a>
    } else {
      return children
    }
  }
  
  return (
    <td {...restProps}>
      {editing ? renderField() : renderValue()}
    </td>
  );
}
