import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { getAllCategories, updateCategory } from '../../store/action'
import styles from './styles.module.css'

export default function PriceList() {
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector(s => s)
  const [data, setData] = useState({})
  const [newData, setNewData] = useState({})
  
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if(categories.length > 0) {
      categories.forEach(e => {
        setData(prev => ({...prev, [e.name]: e}))
      })
    }
  }, [categories])

  const handleChangeInput = (input, categoryName, field, index) => {
    setData(prev => {
      const changedCities = prev[categoryName].cities ? [...prev[categoryName].cities] : []
      changedCities[index] = {
        ...changedCities[index],
        [field]: input.target.value
      }
      return {
        ...prev,
        [categoryName]: {
          ...prev[categoryName],
          cities: changedCities
        }
      }
    })
  } 

  const handleNewInput = (input, categoryName, field) => {
    setNewData(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        [field]: input.target.value
      }
    }))
  }

  const submit = (category, isNew) => {
    const _categories = {...data}
    const _category = {..._categories[category.name], images: _categories[category.name].image}
    if(isNew) {
      if(!_category.cities){
        _category.cities = []
      }
      _category.cities.push(newData[category.name])
      dispatch(updateCategory(category._id, _category, () => setNewData({})))
    } else {
      dispatch(updateCategory(category._id, _category, () => setData(prev => ({...prev, [category.name]: {}}))))
    }
  }

  const hapus = (category, index) => {
    const _categories = {...data}
    const _category = {..._categories[category.name], images: _categories[category.name].image}
    const _cities = _category.cities.filter((e,i) => i !== index)
    _category.cities = _cities
    dispatch(updateCategory(category._id, _category, () => setData(prev => ({...prev, [category.name]: {}}))))
  }

  return (
    <div className={styles.root}>
      {categories.map((category, idx) => (
        <div key={idx}>
          <h2>{category.name}</h2>
          <div className={styles.cards}>
            {data[category.name]?.cities?.map((city, index) => (
              <div className={styles.card} key={index}>
                <Input 
                  label="Nama Kota"
                  meta={{}}
                  input={{
                    onChange: e => handleChangeInput(e, category.name, 'name', index),
                    value: city.name
                  }}
                />
                <Input 
                  label="Link Price List"
                  meta={{}}
                  input={{
                    onChange: e => handleChangeInput(e, category.name, 'file', index),
                    value: city.file
                  }}
                />
                <div className={styles.buttonGroup}>
                  <Button 
                    variant="active-square" 
                    handleClick={() => submit(category)}
                    disabled={(city.name === category.cities[index].name && city.file === category.cities[index].file) || isLoading[`updateCategory-${category._id}`]}
                  >
                    Simpan
                  </Button>
                  <Button handleClick={() => hapus(category, index)}>Hapus</Button>
                </div>
              </div>  
            ))}
            <div className={styles.card}>
              <Input 
                label="Nama Kota"
                meta={{}}
                input={{
                  onChange: e => handleNewInput(e, category.name, 'name'),
                  value: newData[category.name]?.name || ''
                }}
              />
              <Input 
                label="Link Price List"
                meta={{}}
                input={{
                  onChange: e => handleNewInput(e, category.name, 'file'),
                  value: newData[category.name]?.file || ''
                }}
              />
              <div className={styles.buttonGroup}>
                <Button 
                  variant="active-square" 
                  handleClick={() => submit(category, true)}
                  disabled={(!newData[category.name]?.name || !newData[category.name]?.file) || isLoading[`updateCategory-${category._id}`]}
                >
                  Tambah
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
