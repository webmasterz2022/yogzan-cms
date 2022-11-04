import React from 'react'
import Switch from '../Switch'
import styles from './styles.module.css'

export default function ButtonFilter(props) {
  const {children, variant, handleClick, useToggle, toggleValue, onChangeToggle} = props
  return (
    <button onClick={handleClick} className={[styles.root, styles[variant]].join(' ')}>
      <div>
        {children}
      </div>
      {useToggle && (
        <div className={styles.usetoggle}>
          <hr/>
          <small>Tampilkan di Galeri</small>
          <Switch
            className={styles.switch}
            input={{checked: toggleValue, onChange: e => onChangeToggle(e.target.checked)}}
            inputProps={{}}
          />
        </div>
      )}
    </button>
  )
}
