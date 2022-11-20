import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import fileToBase64 from '../../utils/fileTobase64'
import Button from '../Button'
import Input from '../Input'
import TextArea from '../TextArea'
import SelectInput from '../SelectInput'
import Upload from '../Upload'
import imageCompression from 'browser-image-compression'
import { useDispatch, useSelector } from 'react-redux'
import { addPortfolio, deletePortfolio, updatePortfolio } from '../../store/action'

export default function CardGallery(props) {
  const {image, title, layanan, kota, description, isNew, _id, vertical, horizontal} = props
  const dispatch = useDispatch()
  const {isLoading} = useSelector(s => s)
  const [images, setImages] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [desc, setDesc] = useState('')
  const [orientation, setOrientation] = useState('')
  const [localLoading, setLocalLoading] = useState(false)

  useEffect(() => {
    setImages(image)
  }, [image])

  useEffect(() => {
    setName(title)
  }, [title])

  useEffect(() => {
    setCategory(layanan)
  }, [layanan])

  useEffect(() => {
    setCity(kota)
  }, [kota])

  useEffect(() => {
    setDesc(description)
  }, [description])

  useEffect(() => {
    if(vertical) {
      setOrientation('Vertical')
    } else if(horizontal) {
      setOrientation('Horizontal')
    } else {
      setOrientation('')
    }
  }, [vertical, horizontal])

  const isChangeOrientation = () => {
    if(orientation === 'Vertical' && vertical) {
      return true
    } else if(orientation === 'Horizontal' && horizontal) {
      return true
    } else if(!orientation) {
      return true
    } else {
      return false
    }
  }

  const disabledButton = (image === images && name === title && desc === description && city === kota && isChangeOrientation()) || localLoading
  
  const handleChangeImage = async e => {
    e.persist()
    setLocalLoading(true)
    setName(e.target.files[0].name.split('.')[0])
    const compressed = await imageCompression(e.target.files[0], {maxSizeMB: 0.5})
    const converted = await fileToBase64(compressed)
    setImages(converted)
    setLocalLoading(false)
  }

  const reset = () => {
    setImages('')
    setName('')
    setCity('')
    setDesc('')
    setOrientation('')
  }

  const submit = () => {
    if(!isNew) {
      dispatch(updatePortfolio({
        name,
        image: images,
        category,
        city,
        horizontal: orientation === 'Horizontal',
        vertical: orientation === 'Vertical',
        description: desc || ''
      }, _id))
    } else {
      dispatch(addPortfolio({
        name,
        image: images,
        category,
        city,
        horizontal: orientation === 'Horizontal',
        vertical: orientation === 'Vertical',
        description: desc || ''
      }, reset))
    }
  }

  const remove = () => {
    dispatch(deletePortfolio(category, _id))
  }

  return (
    <div className={styles.root}>
      <Upload 
        meta={{}}
        input={{onChange: handleChangeImage}}
        data={{src: images}}
        isLoading={localLoading}
        deleteFile={() => setImages('')}
      />
      <Input
        input={{value: name, placeholder: 'Masukkan Nama Photo', onChange: e => setName(e.target.value)}}
        meta={{}}
        label='Nama Photo'
      />
      <span>Photo Orientation</span>
      <SelectInput 
        placeholder="Vertical / Horizontal"
        options={['Vertical', 'Horizontal']}
        onChange={setOrientation}
        value={orientation}
      />
      <br/>
      <Input
        input={{value: category, readOnly: true, disabled: true}}
        meta={{}}
        label='Kategori Photo'
      />
      <Input
        input={{value: city, placeholder: 'Masukkan Kota', onChange: e => setCity(e.target.value)}}
        meta={{}}
        label='Lokasi Pengambilan Photo'
      />
      <TextArea
        label="Deskripsi Foto"
        input={{value: desc, placeholder: 'Masukkan Deskripsi', onChange: e => setDesc(e.target.value)}}
        meta={{}}
      />
      <Button
        handleClick={submit}
        variant="active-square"
        disabled={disabledButton}
        isLoading={isNew ? isLoading.addPortfolio : isLoading[`updatePortfolio-${_id}`]}
      >
        Simpan
      </Button>
      {!isNew && <Button handleClick={remove} isLoading={isLoading[`deletePortfolio-${_id}`]}>Hapus</Button>}
    </div>
  )
}
