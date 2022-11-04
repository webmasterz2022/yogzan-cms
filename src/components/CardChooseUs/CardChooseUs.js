import React from 'react'
import styles from './styles.module.css'

export default function CardChooseUs(props) {
  const { title, desc, image } = props
  return (
    <div className={styles.root}>
      <div>
        <p>{title}</p>
        <p>{desc}</p>
      </div>
      <img src={image} alt="img"/>
    </div>
  )
}
