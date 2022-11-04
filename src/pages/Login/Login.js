import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { login } from '../../store/action'
import styles from './styles.module.css'
import logoDark from '../../assets/logo-dark.svg'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = () => {
    dispatch(login({email, password}))
  }

  const register = () => {
    navigate(routes.REGISTER())
  }

  return (
    <section className={styles.root}>
      <div>
        <img src={logoDark}/>
        <Input 
          label="Email"
          meta={{}}
          input={{onChange: e => setEmail(e.target.value), type: 'email'}}
          inputProps={{placeholder: 'Masukkan Email'}}
        />
        <Input 
          label="Password"
          meta={{}}
          input={{onChange: e => setPassword(e.target.value), type: 'password'}}
          inputProps={{placeholder: 'Masukkan Password'}}
        />
        <div>
          <Button disabled={!email || !password} variant="active-square" handleClick={submit}>
            Login
          </Button>
          <Button handleClick={register}>
            Register
          </Button>
        </div>
      </div>
    </section>
  )
}
