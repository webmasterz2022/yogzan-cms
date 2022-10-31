import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import logoDark from '../../assets/logo-dark.svg'
import homeLight from '../../assets/home-light.svg'
import homePrimary from '../../assets/home-primary.svg'
import portfolioLight from '../../assets/portfolio-light.svg'
import portfolioPrimary from '../../assets/portfolio-primary.svg'
import hiringLight from '../../assets/hiring-light.svg'
import hiringPrimary from '../../assets/hiring-primary.svg'
import bookingPrimary from '../../assets/booking-primary.svg'
import bookingLight from '../../assets/booking-light.svg'
import appsIcon from '../../assets/apps.svg'
import Button from '../Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'
import { getDeviceType } from '../../utils'

export default function Navbar() {
  const device = getDeviceType()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const rootRef = useRef()

  const menus = [
    {
      title: 'Beranda',
      icon: routes.HOMEPAGE() === pathname ? homeLight : homePrimary,
      handleClick: () => navigate(routes.HOMEPAGE()),
      variant: routes.HOMEPAGE() === pathname ? 'active-rounded' : 'negative',
    },{
      title: 'Galeri',
      icon: routes.GALLERY() === pathname ? portfolioLight : portfolioPrimary,
      handleClick: () => navigate(routes.GALLERY()),
      variant: routes.GALLERY() === pathname ? 'active-rounded' : 'negative',
    },{
      title: 'Karir',
      icon: routes.CAREER() === pathname ? hiringLight : hiringPrimary,
      handleClick: () => navigate(routes.CAREER()),
      variant: routes.CAREER() === pathname ? 'active-rounded' : 'negative',
    },{
      title: 'Booking',
      icon: routes.BOOK() === pathname ? bookingLight : bookingPrimary,
      handleClick: () => navigate(routes.BOOK()),
      variant: routes.BOOK() === pathname ? 'active-rounded' : 'negative',
    }
  ]

  useEffect(() => {
    if(pathname !== routes.LOGIN()) {
      if(device === 'desktop' && pathname === routes.HOMEPAGE()) {
        window.onscroll = () => {
          if(device === 'desktop' && pathname === routes.HOMEPAGE()) {
            if(document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
              rootRef.current.style.boxShadow = '0px 11px 12px -4px rgba(138, 132, 130, 0.21)';
            } else {
              rootRef.current.style.boxShadow = 'unset';
            }
          }
        }
      } else {
        window.onscroll = () => {}
      }
    }
  }, [pathname])

  const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  if(pathname === routes.LOGIN()) {
    return null
  }

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.menuBar}>
        {menus.map((menu, idx) => (
          <Button
          key={idx}
            icon={menu.icon}
            variant={menu.variant}
            handleClick={menu.handleClick}
            >
            {menu.title}
          </Button>
        ))}
      </div>
      <div>
        <h2>Hi, <b>{localStorage.getItem('username')}!</b></h2>
        <Button variant="active-square" handleClick={logout}>Logout</Button>
      </div>
    </div>
  )
}
