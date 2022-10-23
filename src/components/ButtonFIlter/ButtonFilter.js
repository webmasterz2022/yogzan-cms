import React from 'react'
import styles from './styles.module.css'

export default function ButtonFilter(props) {
  const {children, variant, handleClick} = props
  return (
    <button onClick={handleClick} className={[styles.root, styles[variant]].join(' ')}>
      {children}
    </button>
  )
}
