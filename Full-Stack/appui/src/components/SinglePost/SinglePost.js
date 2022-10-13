import React, { useEffect, useState } from 'react'
import  './SinglePost.css'
import {Link, useLocation} from 'react-router-dom'
import axios from "axios"


export default function SinglePost() {
  const [post, setPost] = useState({})
  const location = useLocation()
const path = (location.pathname.split("/")[2])


useEffect(() =>{
  const getPost = async () =>{
    const res = await axios.get("/posts/" + path)
    setPost(res.data)
  }
  getPost()
},[path])

  return (
    <div className='singlePost'>
    <div className='singlePostWrapper'>
    {post.photo && (
      <img className='singlePostImg' src={post.photo} alt='postImg' />
    )}
    <h1 className='singlePostTitle'>{post.title}
    <div className='singlePostEdit'>
    <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
    <i className="singlePostIcon fa-solid fa-trash-can"></i>
    </div>
    </h1>
    <div className='singlePostInfo'>
    <span className='singlePostAuthor'>
    Author: 
    <Link to={`/?user=${post.username}`} style={{textDecoration:"none" ,color:"darkRed"}}><b>{post.username}</b></Link>
    </span>
    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
    </div>
    <p className="singlePostDesc">{post.desc}</p>
    </div>
    <div className='btc'>
    <Link to="/" style={{textDecoration:"none" ,color:"white"}}> 
    <button className='backBtn'>
    Back
    </button>
    </Link>
</div>
    </div>
  )
}
