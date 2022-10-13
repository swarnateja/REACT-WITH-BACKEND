import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <samp className='headerTitlesSm'>React & Node</samp>
        <samp className='headerTitlesLg'>Blog</samp>
      </div>
      <img className='headerImg'
      src='https://res.cloudinary.com/amst/image/upload/v1647343863/pexels-nathan-cowley-1300510_dllgco.jpg'
      alt='HeaderCoverPic' 
      />
    </div>
  )
}
