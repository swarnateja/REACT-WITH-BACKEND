import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  const [cats,setCats] = useState([])

  useEffect(() =>{
    const getCats = async () =>{
      const res = await axios.get("/categories")
      setCats(res.data)
    };
    getCats()
  }, [])
  return (
    <div className='sidebar'>
    <div className='sidebarItem'>
     <span className='sidebarTitle'>ABOUT ME</span>
     <img className='sidebarImg' src='https://res.cloudinary.com/amst/image/upload/v1647364187/Screenshot_2021-07-18-11-12-57-164_com.google.android.apps.photos_nvmnox.jpg'  alt='myImg'/>
    <p>Consectetur duis id dolor reprehenderit ut aute qui nostrud aliqua proident consequat reprehenderit cillum.</p>
    </div>
    <div className='sidebarItem'>
    <span className='sidebarTitle'>CATEGORIES</span>
    <ul className='sidebarList'>
    {cats.map((c) =>(
      <Link to={`/?cat=${c.name}`} style={{textDecoration:"none" ,color:"darkRed"}}>
      <li className='sidebarListItem'>{c.name}</li>
      </Link>

    ))}
    </ul>
    </div>
    <div>
    <span className='sidebarTitle'>FOLLOW US</span>
    <div className='sidebarSocial'>
      <i className="sidebarIcon fa-solid fa-face-smile"></i>
      <i className="sidebarIcon fa-brands fa-facebook"></i>
      <i className="sidebarIcon fa-brands fa-linkedin"></i>
      <i className="sidebarIcon fa-brands fa-instagram-square"></i>
      </div>
    </div>
    </div>
  )
}
