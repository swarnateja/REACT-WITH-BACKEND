import React from 'react'
import {Link} from 'react-router-dom'

import './Post.css'

export default function Post({post}) {
  return (
    <div className='post'>
    {post.photo && (
      <Link to={`/post/${post._id}`} style={{textDecoration:"none" ,color:"white"}}>    
    <img className='postImg' src={post.photo} alt='postImg'/>
    </Link>
    )}
    <div className='postInfo'>
        <div className='postCats'>
        {post.categories.map((c) =>(
          <span className='postCat'>{c.name}</span>
        ))}
        </div>
        <Link to={`/post/${post._id}`} style={{textDecoration:"none" ,color:""}}>    
        <span className='postTitle'>
            {post.title}
        </span>
        </Link>

        <hr />
        <span className='postDate'>{new Date(post.createdAt).toDateString()}.</span>
    </div>
    <p className='postDesc'>{post.desc} </p>
    </div>
  )
}
