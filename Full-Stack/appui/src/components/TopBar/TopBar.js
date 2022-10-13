import React from 'react'
import { useContext } from "react";
import {Link} from 'react-router-dom'
import { Context } from "../../context/Context";
import './TopBar.css'

export default function TopBar() {

  const { dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };


  return (
    <div className='top'>
    <div className='topLeft'>
    <i className="topIcon fa-solid fa-face-smile"></i>
    <i className="topIcon fa-brands fa-facebook"></i>
    <i className="topIcon fa-brands fa-linkedin"></i>
    <i className="topIcon fa-brands fa-instagram-square"></i>
    </div>
    <div className='topCenter'>
    <ul className='topList'>
        <li className='topListItem'>
          <Link to="/" className='link'>HOME</Link>
        </li>
        <li className='topListItem'>      
            <Link to="/about" className='link'>ABOUT</Link>
        </li>
        <li className='topListItem'>         
         <Link to="/contact" className='link'>CONTACT</Link>
        </li>
        <li className='topListItem'>         
         <Link to="/write" className='link'>WRITE</Link>
        </li>
    </ul>
    </div>
    <div className='topRight'>
    <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
    <Link to="/settings"><img className='topImg' src='https://res.cloudinary.com/amst/image/upload/v1638112912/IMG_4181_3_sjok8c.jpg' alt='ProfilePic' /></Link>       
    <Link to="/login" style={{textDecoration:"none" ,color:"white"}}><button className='logoutButton' onClick={handleLogout}>LOGOUT</button></Link>
    
    

    </div>
    </div>
  )
}
