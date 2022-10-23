import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput'
import TextArea from '../TextArea';

export default function FormDetailPengalaman(props) {
  const { handleSubmitForm, handleStep, data } = props

  const inputProps = [
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Studio', 'Lainnya'] },
    { placeholder: 'Tulis pengalamanmu disini' },
    { placeholder: 'Tulis seri kamera yang dimiliki disini' },
    { placeholder: 'Tulis seri lensa yang dimiliki disini' },
    { placeholder: 'Tulis aksesoris kamera yang dimiliki disini' },
    { placeholder: 'Pilih Waktu', options: ['Weekdays', 'Weekend', 'Weekdays & Weekend'] },
    { placeholder: 'Pilih Expected Fee disini', options: [
      'Dibawah Rp 200.000',
      'Rp 200.000 - Rp 250.000',
      'Rp 250.000 - Rp 300.000',
      'Rp 300.000 - Rp 350.000',
      'Rp 350.000 - Rp 400.000',
      'Rp 450.000 - Rp 500.000',
      'Diatas Rp 500.000',
    ] },
    { placeholder: 'Link CV' },
    { placeholder: 'Link Portfolio' },
  ]

  const disabled = (values) => !values.photoshoot || !values.experience || !values.camera || !values.lens ||
    !values.workingHour || !values.fee || !values.cv || !values.portfolio || (values.photoshoot === "Lainnya" && !values['photoshoot-extended'])


  const _submit = (val) => {
    const _photoshoot = val.photoshoot === 'Lainnya' ? `${val.photoshoot} - ${val['photoshoot-extended']}` : val.photoshoot
    handleSubmitForm({...val, photoshoot: _photoshoot})
  }
  return (
    <div />
  )
}
