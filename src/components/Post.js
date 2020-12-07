import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Grid, Segment} from 'semantic-ui-react'

let Post = ({post}) => {
    let {user_id, user, video, content, created_at, id} = post

    return (
      <Segment>
      <Grid columns={4} relaxed='very'>
        <Grid.Column><NavLink to={`/posts/${id}`}><video src={video} height={20}/></NavLink></Grid.Column>
        <Grid.Column>{content}</Grid.Column>
        <Grid.Column><NavLink to={`/members/${user_id}`}>{user.name}</NavLink></Grid.Column>
        <Grid.Column>{created_at}</Grid.Column>
      </Grid>
    </Segment>       
    )
  }

export default withRouter(Post)