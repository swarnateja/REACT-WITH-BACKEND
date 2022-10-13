import React, { useState } from 'react'
import{Link} from 'react-router-dom'
import './Register.css'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)


const handleSubmit = async (e) =>{
  e.preventDefault()
  setError(false)
  try {
    const res = await axios.post("/auth/register",{
      username,
      email,
      password
    })
    res.data && window.location.replace("/login")
  } catch (error) {
    setError(true)
  }
}
  return (
    <div className='register'>
    <span className='registerTitle'>Register</span>
        <form className='registerForm' onSubmit={handleSubmit}>
        <label htmlFor='Username' >Username</label>
            <input type='Username' id="Username" onChange={e => setUsername(e.target.value)} placeholder='Enter Your Username...'/>
            <label htmlFor='email' >Email</label>
            <input type='email' id="email" placeholder='Enter Your Email...'  onChange={e => setEmail(e.target.value)} />
            <label htmlFor='password' >Password</label>
            <input type='password' id="password" placeholder='Enter Your Password...'  onChange={e => setPassword(e.target.value)} />
            <button type='submit' className='registerButton'>Register</button>
            {error && <span className='error'>User already Exists...!</span>}
        </form>
        <Link to="/login" style={{textDecoration:"none" ,color:"white"}}><button className='registerLoginButton'>LOGIN</button></Link>
    </div>
  )
}
