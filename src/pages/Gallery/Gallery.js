import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import pinLocation from '../../assets/pin-location.svg'
import iconImage from '../../assets/icon-image.svg'
import arrowLight from '../../assets/arrow-light.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'
import xCircle from '../../assets/x-circle.svg'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import Upload from '../../components/Upload'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCategories, getCities, getPortfolioImages } from '../../store/action'
import Button from '../../components/Button'
import { routes } from '../../configs/routes'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import imageCompression from 'browser-image-compression'
import fileToBase64 from '../../utils/fileTobase64'

export default function Gallery() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {portfolioImages, categories} = useSelector(v => v)
  // const categories = ['Wisuda', 'Pernikahan', 'Keluarga']
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  
  const [images, setImages] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(type)
  const [city, setCity] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    type && dispatch(getPortfolioImages(type))
  }, [type])
  
  useEffect(() => {
    window.scrollTo(0,0)
    if(!type){
      setSearchParams({ type: 'Wisuda' })
    }
    dispatch(getAllCategories())
  }, [])

  const handleChangeImage = async e => {
    e.persist()
    setName(e.target.files[0].name)
    const compressed = await imageCompression(e.target.files[0], {maxSizeMB: 0.5})
    const converted = await fileToBase64(compressed)
    setImages(converted)
  }

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <div className={styles.groupButton}>
          {categories?.map(category => (
            <ButtonFilter
              handleClick={() => setSearchParams({ type: category.name })}
              key={category.name}
              variant={type === category.name ? 'active' : ''}
            >
              {type === category.name ? (
                <div className={styles.activeButton}>
                  <img className={styles.iconButton} src={check} alt="v" />
                  {category.name}
                </div>
              ) : (
                <>{category.name}</>
              )}
            </ButtonFilter>
          ))}
        </div>
        <div />
      </div>
      <div className={styles.galleries}>
        {portfolioImages.images.length > 0 && portfolioImages.images.map((e, i) => (
          <div key={i}>
            <Upload 
              meta={{}}
              input={{onChange: handleChangeImage}}
              data={{src: e.url}}
            />
            <Input
              input={{value: e.name, placeholder: 'Masukkan Nama Photo', onChange: e => setName(e.target.value)}}
              meta={{}}
              label='Nama Photo'
            />
            <Input
              input={{value: e.category, readOnly: true, disabled: true}}
              meta={{}}
              label='Kategori Photo'
            />
            <Input
              input={{value: e.city, placeholder: 'Masukkan Kota', onChange: e => setCity(e.target.value)}}
              meta={{}}
              label='Lokasi Pengambilan Photo'
            />
            <TextArea
              label="Deskripsi Foto"
              input={{value: e.description, placeholder: 'Masukkan Deskripsi', onChange: e => setDesc(e.target.value)}}
              meta={{}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
