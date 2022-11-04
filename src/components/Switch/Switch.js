import React from 'react';
import styles from './styles.module.css';

export default function Switch(props) {
  const { className, input, inputProps } = props;
  const classes = [
    styles.root,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label className={styles.switch}>
        <input id={input.name} type="checkbox" {...input} {...inputProps} />
        <span className={[styles.slider, styles.round].join(' ')} />
      </label>
    </div>
  );
}
