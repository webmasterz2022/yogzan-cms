import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';

export default function FormDataDiri(props) {
  const { handleSubmitForm, handleStep, data } = props
  const reqEmail = new RegExp([
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
    '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
    '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  ].join('|'));
  const isEmail = value => reqEmail.test(value) ? undefined : 'Format Email salah';

  const inputProps = [
    { placeholder: 'Tulis nama lengkap disini' },
    { placeholder: 'Tulis nama panggilan disini' },
    { placeholder: 'Tulis email disini' },
    { placeholder: 'Tulis nomor whatsapp disini' },
    { placeholder: 'Tulis alamat domisili saat ini' },
  ]

  const handleNext = (values) => {
    handleStep(values, 'Detail Pengalaman')
  }

  const disabled = values => !values.fullname || !values.nickname || !values.email || !values.phone || !values.address

  return (
    <div/>
  )
}
