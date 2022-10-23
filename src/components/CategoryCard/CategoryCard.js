import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Input from '../Input'
import Button from '../Button'
import Upload from '../Upload'
import { useDispatch } from 'react-redux'
import fileToBase64 from '../../utils/fileTobase64'
import imageCompression from 'browser-image-compression'
import { addCategory, deleteCategory, updateCategory } from '../../store/action'

export default function CategoryCard(props) {
  const { image, title, isNew, id } = props
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState(null)

  useEffect(() => {
    setName(title || '')
  }, [title])

  useEffect(() => {
    setImages(image || null)
  }, [image])

  const handleChangeImage = async e => {
    e.persist()
    setImageName(e.target.files[0].name)
    const compressed = await imageCompression(e.target.files[0], {maxSizeMB: 0.5})
    const converted = await fileToBase64(compressed)
    setImages(converted)
  }

  const submit = () => {
    const cb = () => {
      setImageName('')
      setImages(null)
      setName('')
    }
    if(isNew) {
      dispatch(addCategory({name, images, imageName, displayOnHomepage: true}, cb))
    } else {
      dispatch(updateCategory(id, {name, images, imageName, displayOnHomepage: true}, cb))
    }
  }

  const remove = () => {
    dispatch(deleteCategory(id))
  }

  const deleteImage = () => {
    setImages(null)
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Upload 
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
        <div className={styles.groupButton}>
          <Button handleClick={submit} variant="active-square">Simpan</Button>
          {!isNew && <Button handleClick={remove}>Hapus</Button>}
        </div>
      </div>
    </div>
  )
}
