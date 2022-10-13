import React from 'react'
import './Single.css'
import SinglePost from '../SinglePost/SinglePost'
import Sidebar from '../Sidebar/Sidebar'
import TopBar from '../TopBar/TopBar'




export default function Single() {
  return (
    <> 
    <TopBar />   
    <div className='single'>
    <SinglePost />
    <Sidebar />
    </div></>

  )
  
}