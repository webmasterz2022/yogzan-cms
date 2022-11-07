import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Input from '../Input'
import Button from '../Button'
import Upload from '../Upload'
import { useDispatch } from 'react-redux'
import fileToBase64 from '../../utils/fileTobase64'
import imageCompression from 'browser-image-compression'
import { addCategory, deleteCategory, updateCategory } from '../../store/action'
import Switch from '../Switch'

export default function CategoryCard(props) {
  const { image, title, isNew, id, isLoadingSubmit, isLoadingDelete, toggleValue, displayOnGallery, redirectLink } = props
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState('')
  const [localLoading, setLocalLoading] = useState(false)
  const [toggle, setToggle] = useState(false)
  
  useEffect(() => {
    setName(title || '')
  }, [title])

  useEffect(() => {
    setImages(image || '')
  }, [image])

  useEffect(() => {
    setToggle(toggleValue)
  }, [toggleValue])

  const handleChangeImage = async e => {
    e.persist()
    setLocalLoading(true)
    setImageName(e.target.files[0].name)
    const compressed = await imageCompression(e.target.files[0], {maxSizeMB: 0.5})
    const converted = await fileToBase64(compressed)
    setImages(converted)
    setLocalLoading(false)
  }

  const submit = () => {
    const cb = () => {
      setImageName('')
      setImages('')
      setName('')
      setToggle(false)
    }
    if(isNew) {
      dispatch(addCategory({name, images, imageName, displayOnHomepage: toggle}, cb))
    } else {
      dispatch(updateCategory(id, {name, images, imageName, displayOnHomepage: toggle, displayOnGallery, redirectLink}, () => {}))
    }
  }

  const remove = () => {
    dispatch(deleteCategory(id))
  }

  const deleteImage = () => {
    setImages('')
  }

  const disabledButton = title === name && image === images && toggleValue === toggle

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Upload 
          isLoading={localLoading}
          meta={{}} 
          data={{src: images}} 
          input={{onChange: handleChangeImage}} 
          deleteFile={deleteImage}
        />
      </div>
      <div>
        <small>Nama Layanan</small>
        <Input 
          input={{value: name, placeholder: 'Nama Layanan', onChange: e => setName(e.target.value)}} 
          meta={{}}
        />
        <small>Tampilkan di Beranda</small>
        <Switch 
          className={styles.switch}
          input={{checked: toggle, onChange: e => setToggle(e.target.checked)}}
          inputProps={{}}
        />
        <div className={styles.groupButton}>
          <Button
            handleClick={submit}
            variant="active-square"
            isLoading={isLoadingSubmit}
            disabled={isNew ? false : disabledButton}
          >
            Simpan
          </Button>
          {!isNew && <Button handleClick={remove} isLoading={isLoadingDelete}>Hapus</Button>}
        </div>
      </div>
    </div>
  )
}
