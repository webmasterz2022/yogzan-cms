import React, { useEffect } from 'react'
import styles from './styles.module.css'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCategories, getPortfolioImages, updateCategory } from '../../store/action'
import CardGallery from '../../components/CardGallery'

export default function Gallery() {
  const dispatch = useDispatch()
  const {portfolioImages, categories} = useSelector(v => v)
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')

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
        <div />
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
