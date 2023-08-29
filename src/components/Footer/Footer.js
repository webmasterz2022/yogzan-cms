import React from 'react'
import Button from '../Button'
import styles from './styles.module.css'
import logo from '../../assets/logo-light.svg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'
import youtube from '../../assets/youtube.svg'
import tiktok from '../../assets/tiktok.svg'
import hiringLight from '../../assets/hiring-light.svg'
import bookingLight from '../../assets/booking-light.svg'
import arrowLight from '../../assets/arrow-light.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'

export default function Footer() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  return (
    <section className={styles.root}>
      {![routes.BOOK(), routes.CAREER()].includes(pathname) && (
        <div className={styles.booking}>
          <div>
            <p>Setiap momen punya cerita, dari cinta, perjuangan hingga air mata kebahagiaan. Abadikan setiap cerita berhargamu dengan layanan foto terbaik bersama Yogzan. </p>
          </div>
          <Button variant="active-square" handleClick={() => navigate(routes.BOOK())}>
            Pesan Sekarang
            <img src={arrowLight} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.details}>
        <div>
          <div>
            <img className={styles.logo} src={logo} alt="Yogzan" />
            <div>
              <img onClick={() => window.open('https://www.facebook.com/yogzanfotosinema', '_blank')} className={styles.socmed} src={facebook} alt="FB" />
              <img onClick={() => window.open('https://www.instagram.com/yogzan.graduation/', '_blank')} className={styles.socmed} src={instagram} alt="IG" />
              <img onClick={() => window.open('https://www.youtube.com/channel/UCVcqZinwF4hVDXkMPSNybtg', '_blank')} className={styles.socmed} src={youtube} alt="YT" />
              <img onClick={() => window.open('https://www.tiktok.com/@yogzan.graduation', '_blank')} className={styles.socmed} src={tiktok} alt="TT" />
            </div>
          </div>
          <div>
            <Button icon={bookingLight} variant="active-rounded" handleClick={() => navigate(routes.BOOK())}>Pesan Sekarang</Button>
            <Button icon={hiringLight} variant="active-rounded" handleClick={() => navigate(routes.CAREER())}>Karir</Button>
          </div>
          <div>
            <p>Hubungi Kami</p>
            <p className={styles.email} onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=asktoyogzan@gmail.com', '_blank')}>asktoyogzan@gmail.com</p>
            <p>(+62) 858-7602-0261</p>
          </div>
        </div>
        <div>
          <div className={styles.line} />
          <p>Copyright Yogzan 2022. All Rights Reserved</p>
        </div>
      </div>
    </section>
  )
}
