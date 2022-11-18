import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCategories, getPortfolioImages, updateCategory } from '../../store/action'
import CardGallery from '../../components/CardGallery'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Gallery() {
  const dispatch = useDispatch()
  const {portfolioImages, categories, isLoading} = useSelector(v => v)
  const [searchParams, setSearchParams] = useSearchParams()
  const [redirect, setRedirect] = useState({})
  const type = searchParams.get('type')
  const currentCategory = categories.find(e => e.name === type)

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

  const onChangeToggle = (val, category) => {
    dispatch(updateCategory(category._id, {
      ...category,
      images: category.image,
      displayOnGallery: val
    }, () => {}))
  }

  useEffect(() => {
    if(categories.length > 0) {
      const _redirect = {}
      categories.forEach(e => {
        _redirect[e.name] = e.redirectLink || ''
      })
      setRedirect(_redirect)
    }
  }, [categories])

  console.log(categories)

  const simpanLink = () => {
    const {_id, displayOnGallery, displayOnHomepage, image, name, cities} = currentCategory
    dispatch(updateCategory(
      _id,
      {
        displayOnGallery,
        displayOnHomepage,
        images: image,
        name,
        cities,
        redirectLink: redirect[type]
      },
      () => {}
    ))
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
              useToggle
              onChangeToggle={e => onChangeToggle(e, category)}
              toggleValue={category.displayOnGallery}
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
        <div>
        </div>
      </div>
      <div className={styles.inputLink}>
        <Input
          label={`Lihat Selengkapnya untuk Layanan "${type}"`}
          meta={{}}
          input={{placeholder: 'Masukkan Link', value: redirect[type], onChange: e => setRedirect(prev => ({...prev, [type]: e.target.value}))}}
        />
        <Button 
          variant={'active-square'} 
          handleClick={simpanLink} 
          disabled={redirect[type] === currentCategory?.redirectLink || isLoading[`updateCategory-${currentCategory?._id}`]}
        >
          Simpan Link
        </Button>
      </div>
      <div className={styles.galleries}>
        {portfolioImages.images.length > 0 && portfolioImages.images.map((e, i) => (
          <CardGallery 
            key={i}
            {...e}
            image={e.url}
            title={e.name}
            kota={e.city}
            layanan={type}
          />
        ))}
        <CardGallery 
          isNew 
          layanan={type}
        />
      </div>
    </div>
  )
}
