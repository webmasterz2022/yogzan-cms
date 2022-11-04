import React from 'react'
import styles from './styles.module.css'

export default function Button(props) {
  const {icon, children, className, variant, handleClick, type, disabled, isLoading} = props
  const classname = [styles.root, styles[variant], className].join(' ')

  return (
    <button disabled={disabled || isLoading} className={classname} onClick={handleClick} type={type || 'button'}>
      {icon && <img className={styles.icon} src={icon} />}
      <p>{children}{isLoading && '...'}</p>
    </button>
  )
}
