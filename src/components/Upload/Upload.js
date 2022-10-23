import React, { useRef } from 'react';
import styles from './styles.module.css';
import Button from '../Button';
import redcross from '../../assets/ic-red-cross.svg'
import upload from '../../assets/ic-upload-v2.svg'

function Upload_V2(props) {
  const { className, input, inputProps, data, label, helper, meta, deleteFile } = props;
  const { dirty, error, touched } = meta;
  const inputRef = useRef(null);

  const classes = [
    styles.root,
    !!data || styles.placeholder,
    !!error && (dirty || touched) && styles.error,
    className
  ].filter(Boolean).join(' ');

  const removeData = () => {
    if(inputRef.current) {
      inputRef.current.value = '';
    }
    deleteFile();
  };

  return (
    <div className={classes}>
      <label>{label}</label>
      <div>
        <label>
          {data?.src ? (
            <>
              <img src={data.src} className={styles.thumbnail}/>
            </>
          ) : (
            <div>
              <img src={upload} />
              Upload
            </div>
          )}
          {!data?.src && <input id={input.name} ref={inputRef} {...input} {...inputProps} type="file" />}
        </label>
        {data?.src && <Button handleClick={removeData}><img src={redcross} /></Button>}
      </div>
      <span>{helper}</span>
    </div>
  );
}

export default Upload_V2
