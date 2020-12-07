import React, {useState, useEffect} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {Segment, Grid} from 'semantic-ui-react'

let PostDetail = ({match}) => {
    let [post, setPost] = useState(null)
    
  useEffect(() => {
    let postId = match.params.id
    fetch(`http://localhost:3001/posts/${postId}`)
      .then(r => r.json())
      .then(post => setPost(post))
  },[])

    if (!post) return <h3>Loading...</h3>
    let {video, content, created_at, user_id, user} = post

    return (
        <Segment>
          <Grid rows={2} textAlign='center'>
            <Grid.Row><video src={video} height={500} width={1000} autoPlay/></Grid.Row>
            <Grid.Row>
              <Grid columns={3}>
              <Grid.Column><p>Posted by:</p><NavLink to={`/members/${user_id}`}><h2>{user.name}</h2></NavLink></Grid.Column>
              <Grid.Column><p>Message:</p><h2>{content}</h2></Grid.Column>
              <Grid.Column><p>Posted on:</p><h2>{created_at}</h2></Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
  </Segment>    
    )
  }

export default withRouter(PostDetail)