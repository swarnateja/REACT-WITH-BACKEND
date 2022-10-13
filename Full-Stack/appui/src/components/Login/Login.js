import axios from 'axios'
import React, {  useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../context/Context'
import './Login.css'


export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };




  return (
    <div className='login'>
    <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={handleSubmit}>
            <label htmlFor='email' >Username</label>
            <input type='text' id="email" ref={userRef} placeholder='Enter Your Username...'/>
            <label htmlFor='password' >Password</label>
            <input type='password' id="password" ref={passwordRef}  placeholder='Enter Your Password...'/>
            <button className='loginButton' type='submit' disabled={isFetching}><Link  style={{textDecoration:"none" ,color:"white"}}>Login</Link></button>
        </form>        
        <Link to="/register" style={{textDecoration:"none" ,color:"white"}}><button className='loginRegisterButton'>REGISTER</button></Link>
    </div>
  )
}
