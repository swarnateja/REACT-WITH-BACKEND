import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TopBar from '../TopBar/TopBar'

import './Settings.css'


export default function Settings() {
  return (
    <>
      <TopBar />
      <div className='settings'>
        <div className='settingsWrapper'>
        <div className='settingsTitle'>
        <span className='settingsUpdateTitle'>Update Your Account</span>
        <span className='settingsDeleteTitle'>Delete Your Account</span>
        </div> 
        <form className='settingsForm'>
            <label>Profile Picture</label>
            <div className='settingsPP'>
            <img className='settingsImg' src='https://res.cloudinary.com/amst/image/upload/v1638112912/IMG_4181_3_sjok8c.jpg' alt='ProfilePic' />
            <label htmlFor='fileInput'>
            <i className="settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input type='file' id='fileInput' style={{display:'none'}}/>
            </div>
            <label htmlFor='Username'>Username:</label>
            <input id="Username" type='text' placeholder='Username'/>
            <label htmlFor='email'>Email:</label>
            <input id="email" type='email' placeholder='Email'/>
            <label htmlFor='password'>Password:</label>
            <input id="password" type='password' />
            <button className='settingsSubmit'>Update</button>
        </form>
        </div>
        <Sidebar />
    </div>
    </>
    
  )
}
