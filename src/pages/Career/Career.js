import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHirings, updateHiring } from '../../store/action'
import { Table } from 'antd'
import { getDeviceType, sortAlphabetically, sortDate } from '../../utils'
import Button from '../../components/Button'
import xlsx from 'json-as-xlsx'
import moment from 'moment'
import Column from 'antd/lib/table/Column'
import Input from '../../components/Input'

export default function Career() {
  const device = getDeviceType()
  const dispatch = useDispatch()
  const {hirings, isLoading} = useSelector(s => s)
  const isDesktop = device === 'desktop'
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
    dispatch(updateHiring(form, cancel))
  }

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
  const reqLink2 = new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#-]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/)
  const reqLink = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  const isLink = value => reqLink2.test(value)
  const renderLink = val => isLink(val) ? <a href={val} target="_blank" rel="noreferrer">{val}</a> : val

  const renderDate = val => val ? moment(val).format('DD MMM YYYY, HH:mm') : val

  const columnsTable = [
    { dataIndex: "idx", title: "No.", width: '72px', sorter: (a, b) => a.idx - b.idx, fixed: 'left' },
    { dataIndex: "fullname", title: "Nama", width: '160px' },
    { dataIndex: "nickname", title: "Panggilan", width: '128px' },
    { dataIndex: "email", title: "Email", width: '240px' },
    { dataIndex: "phone", title: "Nomor HP", width: '160px' },
    { dataIndex: "address", title: "Alamat", width: '240px', ellipsis: true },
    { dataIndex: "workingHour", title: "Waktu Kerja", width: '160px', filters: workingHourFilter, onFilter: workingHourOnFilter },
    { dataIndex: "camera", title: "Kamera", width: '128px', ellipsis: true },
    { dataIndex: "lens", title: "Lensa", width: '128px', ellipsis: true },
    { dataIndex: "accessories", title: "Aksesoris", width: '128px', ellipsis: true },
    { dataIndex: "cv", title: "Link CV", width: '160px', render: renderLink },
    { dataIndex: "portfolio", title: "Link Portfolio", width: '160px', render: renderLink },
    { dataIndex: "fee", title: "Fee", width: '160px', filters: feeFilters, onFilter: feeOnFilter },
    { dataIndex: "experience", title: "Pengalaman", width: '240px', ellipsis: true },
    { dataIndex: "createdAt", title: "Tanggal Submit", width: '160px', render: renderDate, sorter: (a, b, type) => sortDate(a, b, type, 'createdAt') },
  ]

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

  const actionCareer = { title: 'Action', width: isDesktop ? '15rem' : '240px',render: (_, record) => {
    const editable = isEditing(record);
    return editable ? (
      <div className={styles.actionButtons}>
        <Button variant="active-square" handleClick={simpan} disabled={isLoading[`updateHiring-${record._id}`]}>Simpan</Button>
        <Button handleClick={() => cancel()}>Batal</Button>
      </div>
    ) : (
      <div className={styles.actionButtons}>
        <Button className={styles.editAction} variant="active-square" disabled={editingKey !== ''} handleClick={() => edit(record)}>
          Edit
        </Button>
      </div>
    );
  } }

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
        {label: 'Tanggal Submit', value: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm')},
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
        loading={isLoading.hiring}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={hirings.data ? hirings.data : []}
        pagination={{position: ['bottomLeft'], pageSize: 100, showSizeChanger: false}}
        scroll={{y: '60vh'}}
      >
        {mergedColumns.map((e, i) => (
          <Column key={i} {...e} />
        ))}
        <Column onCell={e => editableProps(e, 'text', {title: "Keterangan", dataIndex: 'note'})} dataIndex='note' width={'240px'} title="Keterangan" />
        <Column onCell={e => editableProps(e, 'text', {title: "Status", dataIndex: 'status'})} dataIndex='status' width={'240px'} title="Status" sorter={(a,b) => sortAlphabetically(a, b, 'status')} />
        <Column {...actionCareer}/>
      </Table>
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

  const handleChange = e => {
    setForm(prev => ({...prev, [dataIndex]: e.target.value}))
  }

  const inputProps = editing ? {
    value: form[dataIndex] || '',
    onChange: handleChange,
    type: inputType,
  } : {}

  const renderField = () => {
    return (
      <Input 
        meta={{}}
        input={{...inputProps}}
      />
    )
  }

  const renderValue = () => {
    return children
  }
  
  return (
    <td {...restProps}>
      {editing ? renderField() : renderValue()}
    </td>
  );
}