import React from 'react'
import warning from '../../assets/warning.svg'
import styles from './styles.module.css'

export default function Input(props) {
  const { className, input, inputProps, label, meta, helper} = props;
  const { dirty, error, touched } = meta;

  const classes =   [
    styles.root,
    !!input.value || styles.empty,
    !!error && (dirty || touched) && styles.error,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label>{label}</label>
      <div className={styles.wrapper}>
        <input className={classes} id={input.name} {...input} {...inputProps}  />
      </div>
      {!!error && (dirty || touched) && <small className={styles.error}>
        <img src={warning} />
        {error}
      </small>}
      <p className={styles.helper}>{helper}</p>
    </div>
  );
}
