import React from 'react'
import styles from './styles.module.css'

export default function Button(props) {
  const {icon, children, className, variant, handleClick, type, disabled} = props
  const classname = [styles.root, styles[variant], className].join(' ')

  return (
    <button disabled={disabled} className={classname} onClick={handleClick} type={type || 'button'}>
      {icon && <img className={styles.icon} src={icon} />}
      <p>{children}</p>
    </button>
  )
}
