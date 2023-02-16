import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { getAllBookings, getAllCategories, getAllFixBookings, updateFixBooking, pathChecker as checkPath, deleteFixBooking } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form } from 'antd'
import moment from 'moment'
import ButtonFIlter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import { getDeviceType, sortDate } from '../../utils'
import Input from '../../components/Input'
import Button from '../../components/Button'
import xlsx from 'json-as-xlsx'
import spinner from '../../assets/spinner.gif'
import Column from 'antd/lib/table/Column'
import ColumnGroup from 'antd/lib/table/ColumnGroup'

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
  const deleteFixbook = (record) => {
    dispatch(deleteFixBooking(record))
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
    { dataIndex: "idx", title: "No.", width: '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "name", title: "Nama", width: '160px' },
    { dataIndex: "layanan", title: "Layanan", width: '128px' },
    { dataIndex: "city", title: "Kota", width: '128px' },
    { dataIndex: "date", title: "Tanggal Pemotretan", width: '240px', render: renderDate },
    { dataIndex: "phone", title: "No. Whatsapp", width: '160px' },
    { dataIndex: "knowFrom", title: "Mengetahui Yogzan dari", width: '240px', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '128px', render: renderDateTime, sorter: (a, b, type) => sortDate(a, b, type, 'createdAt') },
  ]

  const columnsTableFixBooking = [
    { dataIndex: "idx", title: "No.", width: '64px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "date", title: "Tanggal", width: '160px', render: renderDate, editable: true, sorter: (a, b, type) => sortDate(a, b, type, 'date') },
    { dataIndex: "nickname", title: "Nama Panggilan", width: '160px', editable: true },
    { dataIndex: "photographer", title: 'Fotografer', width: '160px', editable: true},
    { dataIndex: "time", title: "Waktu", width: '128px', editable: true },
    { dataIndex: "duration", title: 'Durasi', width: '128px', editable: true},
    { dataIndex: "package", title: 'Jenis Paket', width: '128px', editable: true},
    { dataIndex: "location", title: "Lokasi Pemotretan", width: '200px', editable: true },
    { dataIndex: "fullname", title: "Nama Lengkap", width: '160px', editable: true },
    { dataIndex: "layanan", title: "Layanan", width: '128px', editable: true },
    { dataIndex: "campus", title: "Asal Kampus", width: '128px', editable: true },
    { dataIndex: "faculty", title: "Fakultas / Jurusan", width: '200px', editable: true },
    { dataIndex: "ig", title: "Akun Instagram", width: '200px', editable: true },
    { dataIndex: "ig-mua", title: "Instagram MUA", width: '200px', editable: true },
    { dataIndex: "ig-attire", title: "Instagram Attire", width: '200px', editable: true },
    { dataIndex: "phone", title: "No. Whatsapp", width: '160px', editable: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '160px', render: renderDateTime, sorter: (a, b, type) => sortDate(a, b, type, 'createdAt') },
    { dataIndex: "rawphoto", title: 'Link Raw Photo', width: '320px', editable: true},
    { dataIndex: "linkphoto", title: 'Link Client', width: '420px', editable: true},
    { dataIndex: "stored", title: 'Link Drive', width: '240px', editable: true, render: renderLink},
  ]

  const actionFixbooking = { title: 'Action', width: isDesktop ? '15rem' : '240px',render: (_, record) => {
    const editable = isEditing(record);
    return editable ? (
      <div className={styles.actionButtons}>
        <Button variant="active-square" handleClick={simpan} disabled={isLoading[`updateFixBooking-${record._id}`]}>Simpan</Button>
        <Button handleClick={() => cancel()}>Batal</Button>
      </div>
    ) : (
      <div className={styles.actionButtons}>
        <Button className={styles.editAction} variant="active-square" disabled={editingKey !== ''} handleClick={() => edit(record)}>
          Edit
        </Button>
        <Button className={styles.editAction} variant="danger-square" disabled={editingKey !== ''} handleClick={() => deleteFixbook(record)}>
          Hapus
        </Button>
      </div>
    );
  } }

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
      onCell: (record) => editableProps(record, type, col),
    };
  });

  const editableProps = (record, type, col) => ({
    record,
    inputType: type,
    dataIndex: col.dataIndex,
    title: col.title,
    editing: isEditing(record),
    form,
    setForm
  })

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
          {label: 'Tanggal Pemotretan', value: row => moment(row.date).isValid() ? moment(row.date).format('YYYY-MM-DD') : row.date},
          {label: 'Nama Panggilan', value: 'nickname'},
          {label: 'Fotografer', value: 'photographer'},
          {label: 'Waktu Pemotretan', value: 'time'},
          {label: 'Durasi', value: 'duration'},
          {label: 'Paket Dipilih', value: 'package'},
          {label: 'Lokasi Pemotretan', value: 'location'},
          {label: 'Nama Lengkap', value: 'fullname'},
          {label: 'Layanan Dipilih', value: 'layanan'},
          {label: 'Asal Kampus', value: 'campus'},
          {label: 'Fakultas / Jurusan', value: 'faculty'},
          {label: 'Akun Instagram', value: 'ig'},
          {label: 'Intagram MUA', value: 'ig-mua'},
          {label: 'Instagram Attire', value: 'ig-attire'},
          {label: 'No. Whatsapp', value: row => row.phone ? `'${row.phone}` : ''},
          {label: 'Follow', value: (row) => row.follow ? '☑️' : ''},
          {label: 'dikirim FG', value: 'fg'},
          {label: 'dipost', value: 'post'},
          {label: 'Story', value: 'story'},
          {label: 'Feed', value: 'feed'},
          {label: 'Reel', value: 'reel'},
          {label: 'Testimoni', value: 'testimony'},
          {label: 'Keterangan', value: 'notes'},
          {label: 'Link Raw Photo', value: 'rawphoto'},
          {label: 'Link Client', value: row => row.linkphoto ? `https://yogzan.com/result/${row.linkphoto}` : ''},
          {label: 'Link Drive', value: 'stored'},
          // {label: 'Status', value: [
          //   {label: 'Follow', value: 'follow'},
          //   {label: 'BTS', value: [
          //     {label: 'dikirim FG', value: 'fg'},
          //     {label: 'dipost', value: 'post'}
          //   ]},
          //   {label: 'Story', value: 'story'},
          //   {label: 'Feed', value: 'feed'},
          //   {label: 'Reel', value: 'reel'},
          //   {label: 'Testimoni', value: 'testimony'},
          //   {label: 'Keterangan', value: 'notes'},
          // ]},
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
      {type === 'Booking' ? (
        <Table 
          loading={isLoading.booking}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataBooking.data ? dataBooking.data.map((e, i) => ({...e, idx: i+1})) : []}
          columns={mergedColumns}
          pagination={{position: ['bottomLeft'], pageSize: 100, showSizeChanger: false}}
          scroll={{y: '60vh'}}
        />
      ) : (
        <Table 
          loading={isLoading.fixBooking}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataBooking.data ? dataBooking.data.map((e, i) => ({...e, idx: i+1})) : []}
          pagination={{position: ['bottomLeft'], pageSize: 100, showSizeChanger: false}}
          scroll={{y: '60vh'}}
          bordered
        >
          {mergedColumns.map((e, i) => (
            <Column key={i} {...e}/>
          ))}
          <ColumnGroup title="Status">
            <Column align='center' onCell={e => editableProps(e, 'checkbox', {title: "Follow", dataIndex: 'follow'})} editable={true} dataIndex='follow' width={'80px'} title="Follow" render={e => e && '☑️'}/>
            <ColumnGroup title="BTS">
              <Column align='center' onCell={e => editableProps(e, 'text', {title: "dikirim FG", dataIndex: 'fg'})} editable={true} dataIndex='fg' width={'100px'} title="dikirim FG" />
              <Column align='center' onCell={e => editableProps(e, 'text', {title: "dipost", dataIndex: 'post'})} editable={true} dataIndex='post' width={'100px'} title="dipost" />
            </ColumnGroup>
            <Column align='center' onCell={e => editableProps(e, 'text', {title: "Story", dataIndex: 'story'})} editable={true} dataIndex='story' width={'100px'} title="Story" />
            <Column align='center' onCell={e => editableProps(e, 'text', {title: "Feed", dataIndex: 'feed'})} editable={true} dataIndex='feed' width={'100px'} title="Feed" />
            <Column align='center' onCell={e => editableProps(e, 'text', {title: "Reel", dataIndex: 'reel'})} editable={true} dataIndex='reel' width={'100px'} title="Reel" />
            <Column align='center' onCell={e => editableProps(e, 'text', {title: "Testimoni", dataIndex: 'testimony'})} editable={true} dataIndex='testimony' width={'240px'} title="Testimoni" />
            <Column align='center' onCell={e => editableProps(e, 'text', {title: "Keterangan", dataIndex: 'notes'})} editable={true} dataIndex="notes" width={'240px'} title="Keterangan" />
          </ColumnGroup>
          <Column {...actionFixbooking}/>
        </Table>
      )}
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
    } else if(dataIndex === 'follow') {
      setForm(prev => ({...prev, [dataIndex]: e.target.checked}))
    } else {
      setForm(prev => ({...prev, [dataIndex]: e.target.value}))
    }
  }

  const inputProps = editing ? {
    value: inputType === 'date' ? moment(form[dataIndex]).format('YYYY-MM-DD') : form[dataIndex] || '',
    onChange: handleChange,
    type: inputType,
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
      if(inputType === 'checkbox'){
        inputProps.checked = form[dataIndex]
      }
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
