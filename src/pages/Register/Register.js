import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'
import logoDark from '../../assets/logo-dark.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { register } from '../../store/action'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = () => {
    dispatch(register({username, email, password}))
  }

  const login = () => {
    navigate(routes.LOGIN())
  }

  return (
    <section className={styles.root}>
      <div>
        <img src={logoDark}/>
        <Input 
          label="Username"
          meta={{}}
          input={{onChange: e => setUsername(e.target.value)}}
          inputProps={{placeholder: 'Masukkan Username'}}
        />
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
          <Button disabled={!email || !password || !username} variant="active-square" handleClick={submit}>
            Register
          </Button>
          <Button handleClick={login}>
            Back to Login
          </Button>
        </div>
      </div>
    </section>
  )
}
