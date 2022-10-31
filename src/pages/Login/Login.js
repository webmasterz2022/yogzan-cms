import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { login } from '../../store/action'
import styles from './styles.module.css'
import logoDark from '../../assets/logo-dark.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(login({email, password}))
  }

  return (
    <section className={styles.root}>
      <div>
        <img src={logoDark}/>
        <Input 
          label="Email"
          meta={{}}
          input={{onChange: e => setEmail(e.target.value), type: 'email'}}
          inputProps={{}}
        />
        <Input 
          label="Password"
          meta={{}}
          input={{onChange: e => setPassword(e.target.value), type: 'password'}}
          inputProps={{}}
        />
        <Button disabled={!email || !password} variant="active-square" handleClick={submit}>
          Login
        </Button>
      </div>
    </section>
  )
}
