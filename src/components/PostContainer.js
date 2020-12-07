import React from 'react'
import Post from './Post'
import PostForm from './PostForm'
import {withRouter} from 'react-router-dom'

let PostContainer = ({members, onFormSubmit, currentUserId}) => {
      let posts = members.map(member => member.posts).flat().sort((p1,p2) => p2.id-p1.id)
      let renderPosts = posts.map(post => <Post key={post.id} post={post}/>)
      return (
        <>
        <PostForm onFormSubmit={onFormSubmit} currentUserId={currentUserId}/>
        {renderPosts}
        </>  
      )
    }
  
  export default withRouter(PostContainer)