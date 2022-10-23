import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Upload from '../Upload'
import TextArea from '../TextArea'
import Input from '../Input'
import Button from '../Button'
import imageCompression from 'browser-image-compression'
import fileToBase64 from '../../utils/fileTobase64'
import { useDispatch } from 'react-redux'
import { addTestimony, deleteTestimony, updateTestimony } from '../../store/action'

export default function CardTestimony(props) {
  const { image, desc, name, link, isNew, id } = props
  const classname = [styles.root, isNew ? styles.new : ''].join(' ')
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState(null)
  const [testimony, setTestimony] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUsername(name || '')
  }, [name])

  useEffect(() => {
    setImages(image || null)
  }, [image])

  useEffect(() => {
    setTestimony(desc || '')
  }, [desc])

  useEffect(() => {
    setUrl(link || '')
  }, [link])

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
      setUsername('')
      setUrl('')
      setTestimony('')
    }
    if(isNew) {
      dispatch(addTestimony({name: username, images, imageName, desc: testimony, link: url}, cb))
    } else {
      dispatch(updateTestimony(id, {name: username, images, imageName, desc: testimony, link: url}, () => {}))
    }
  }

  const remove = () => {
    dispatch(deleteTestimony(id))
  }

  const deleteImage = () => {
    setImages(null)
  }

  return (
    <div className={classname}>
      <div>
        <Upload
          meta={{}}
          data={{src: images}}
          input={{onChange: handleChangeImage}}
          deleteFile={deleteImage}
          label="Foto Klien" 
        />
        <TextArea
          label="Testimoni"
          input={{value: testimony, placeholder: 'Masukkan Testimoni', onChange: e => setTestimony(e.target.value)}}
          meta={{}}
        />
      </div>
      <div>
        <Input
          input={{value: username, placeholder: 'Masukkan Username', onChange: e => setUsername(e.target.value)}}
          meta={{}}
          label='Username Klien'
        />
        <Input
          input={{value: url, placeholder: 'Masukkan Link', onChange: e => setUrl(e.target.value)}}
          meta={{}}
          label='Link Sosial Media'
        />
      </div>
      <Button handleClick={submit} variant="active-square">Simpan</Button>
      {!isNew && <Button handleClick={remove}>Hapus</Button>}
    </div>
  )
}
