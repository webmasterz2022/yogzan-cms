import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import CardChooseUs from '../../components/CardChooseUs'
import { careerChooseUs } from './dataMock'
import satu from '../../assets/satu.svg'
import dua from '../../assets/dua.svg'
import tiga from '../../assets/tiga.svg'
import coverCareer from '../../assets/coverCareer.png'
import formImage from '../../assets/hiring-cover.jpg'
import FormDataDiri from '../../components/FormDataDiri'
import FormDetailPengalaman from '../../components/FormDetailPengalaman'
import { useDispatch } from 'react-redux'
import { submitHiring } from '../../store/action'

export default function Career() {
  const dispatch = useDispatch()
  const stepperContent = ['Data Diri', 'Detail Pengalaman']
  const [step, setStep] = useState(stepperContent[0])
  const [data, setData] = useState({
    "fullname": '',
    "nickname": '',
    "email": '',
    "phone": '',
    "address": '',
    "photoshoot": '',
    "experience": '',
    "camera": '',
    "lens": '',
    "accessories": '',
    "workingHour": '',
    "fee": '',
    "cv": '',
    "portfolio": '',
  })

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const handleSubmit = (values, step) => {
    dispatch(submitHiring({ ...data, ...values }, () => {
      window.location.href = '/career'
    }))
  }

  const changeStep = (dataOnStep, step) => {
    setData(prev => ({...prev, ...dataOnStep}))
    step && setStep(step)
  }

  return (
    <section className={styles.root}>
      <h3>Salurkan Hobi dan Kembangkan Skill Fotografi Kamu!</h3>
      <p>Kamu hobi motret dan mau mengembangkan skill sambil dapat penghasilan tambahan? Yuk gabung dengan Yogzan!</p>
      <div className={styles.why}>
        <h3>Kenapa Harus Yogzan?</h3>
        <div>
          {careerChooseUs.map((why, i) => (
            <CardChooseUs {...why} key={i}/>
          ))}
        </div>
      </div>
      <div className={styles.workflow}>
        <div className={styles.title}>
          <h2>Bagaimana cara kerjanya?</h2>
          <p>Daftarkan diri kamu untuk menjadi kolaborator Yogzan melalui form yang disediakan.</p>
        </div>
        <div className={styles.cards}>
          <div>
            <h4>Terima Tugas</h4>
            <p>Tim kami akan menghubungi kamu terkait informasi detail mengenai proyek yang akan kamu laksanakan.</p>
            <img src={satu} alt="1"/>
          </div>
          <div>
            <h4>Foto dan Kirim</h4>
            <p>Setelah melakukan sesi foto atau video, kirim semua hasilnya ke Yogzan melalui akses cloud storage milik Yogzan.</p>
            <img src={dua} alt="2"/>
          </div>
          <div>
            <h4>Terima Komisi</h4>
            <p>Setelah foto kami terima, silakan tunggu untuk mendapatkan komisi kamu dalam waktu 1 hingga 2 hari.</p>
            <img src={tiga} alt="3"/>
          </div>
        </div>
      </div>
      <div className={styles.cover}>
        <img src={coverCareer} />
      </div>
      <div className={styles.formContent}>
        <div>
          <h3>Gabung di Yogzan Sekarang!</h3>
          <p>Tak sabar ingin berkenalan dengan kamu lebih dekat, yuk isi formulir di bawah!</p>
          <div className={styles.stepper}>
            <p 
              className={step === stepperContent[0] ? styles.active : ''}
            >
              {stepperContent[0]}
            </p>
            <div className={styles.line}/>
            <p
              className={step === stepperContent[1] ? styles.active : ''}
            >
              {stepperContent[1]}
            </p>
          </div>
          {step === stepperContent[0] ? (
            <FormDataDiri data={data} handleStep={changeStep} handleSubmitForm={(e) => handleSubmit(e, stepperContent[0])} />
          ) : (
            <FormDetailPengalaman data={data} handleStep={changeStep} handleSubmitForm={(e) => handleSubmit(e, stepperContent[1])} />
          )}
        </div>
        <img src={formImage} />
      </div>
    </section>
  )
}
