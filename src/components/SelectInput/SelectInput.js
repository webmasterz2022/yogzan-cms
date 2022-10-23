import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import chevron from '../../assets/chevron.svg'
import check from '../../assets/check.svg'

export default function SelectInput(props) {
  const {placeholder, options, value, onChange, input, helper} = props
  
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selected, setSelected] = useState('')

  const _handleClick = (opt) => {
    setSelected(opt)
    onChange(opt)
    setOpenDropdown(false)
  }

  useEffect(() => {
    setSelected(value || input?.value)
  }, [value])

  return (
    <div className={styles.root}>
      <div className={styles.select} onClick={() => setOpenDropdown(prev => !prev)}>
        <span className={selected ? styles.selected : ''}>{selected || placeholder}</span>
        <img className={openDropdown ? styles.rotate : ''} src={chevron} alt='v'/>
      </div>
      {openDropdown && <div className={styles.container}>
        <div>{placeholder}</div>
        {options.map(opt => (
          <div onClick={() => _handleClick(opt)} className={selected === opt ? styles.active : ''} key={opt}>
            {opt}
            {selected === opt && <img src={check} alt={'selected'}/>}
          </div>
        ))}
      </div>}
      {helper && <p className={styles.helper}>{typeof helper === 'function' ? helper() : helper}</p>}
    </div>
  )
}
