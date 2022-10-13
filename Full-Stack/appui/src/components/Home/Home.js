import React, { useEffect, useState } from 'react'
import './Home.css'
import TopBar from '../TopBar/TopBar'
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import Sidebar from '../Sidebar/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'


export default function Home() {
 const [posts, setPosts] = useState([])
 const {search} = useLocation()

  useEffect(() =>{
    const fetchPosts = async () =>{
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])
  return (
    <>
    <TopBar/>
    <Header/>
    <div className='home'> 
    <Posts posts={posts}/>
    <Sidebar />
    </div>
    </>
  )
}
