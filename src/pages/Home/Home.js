import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import keluarga from '../../assets/keluarga.jpeg'
import pernikahan from '../../assets/pernikahan.jpg'
import wisuda from '../../assets/wisuda.jpg'

import CategoryCard from '../../components/CategoryCard'
import CardTestimony from '../../components/CardTestimony'
import { getHomepageImages, deleteGallery, uploadHomepageGallery, getAllCategories, getAllTestimonies } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Upload from '../../components/Upload'
import fileToBase64 from '../../utils/fileTobase64'
import imageCompression from 'browser-image-compression';

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { homepageImages, categories, testimonials } = useSelector(s => s)
  const [images, setImages] = useState(homepageImages)

  useEffect(() => {
    window.scrollTo(0,0)
    if(homepageImages.length === 0) {
      dispatch(getHomepageImages())
    }
    dispatch(getAllCategories())
    dispatch(getAllTestimonies())
  }, [])

  useEffect(() => {
    setImages(homepageImages)
  }, [homepageImages])
  
  const deleteFile = (e, i) => {
    console.log(e, i)
    let deleted = [...images]
    deleted[i] = {} 
    setImages(deleted)
    if(e._id) {
      dispatch(deleteGallery(e._id))
    }
  }

  const changeFile = async e => {
    const name = e.target.files[0].name
    const compress = await imageCompression(e.target.files[0], {maxSizeMB: 0.5})
    const file = await fileToBase64(compress)
    dispatch(uploadHomepageGallery(file, name))
  }

  return (
    <section className={styles.root}>
      <h2>List Mini Galeri</h2>
      <div className={styles.galleries}>
        <div className={styles.uploads}>
          {images.length > 0 && Array.from({length: 13}).map((e, i) => (
            <Upload 
              meta={{}} 
              data={{...images[i], src: images[i]?.url}} 
              input={{onChange: changeFile}}
              deleteFile={() => deleteFile(images[i], i)}
              key={i}
            />
          ))} 
        </div>
        <div>
          <p>Daftar Layanan</p>
          <div>
            {categories.map(category => (
              <CategoryCard key={category.name} {...category} title={category.name} id={category._id} />
            ))}
          </div>
          <CategoryCard isNew />
        </div>
      </div>
      <div className={styles.testimonials}>
        <h3>List Testimoni</h3>
        <div>
          {testimonials.map((e, i) => (
            <CardTestimony 
              key={i}
              image={e.image}
              desc={e.desc}
              name={e.name}
              link={e.link}
              id={e._id}
            />
          ))}
          <CardTestimony isNew />
        </div>
      </div>
    </section>
  )
}
