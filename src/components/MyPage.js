import React from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {Grid, Card, Icon} from 'semantic-ui-react'

let MyPage = ({members, currentUserId}) => {
      if (!members.find(member => member.id === currentUserId)) return <h1>Please add yourself to follow members!</h1>
      let currentUser = members.find(member => member.id === currentUserId)
      let my_contacts_ids = currentUser.my_contacts.map(my_contact => my_contact.id)
      let posts = members.map(member => member.posts).flat().sort((p1,p2) => p2.id - p1.id)
      let my_contacts_posts = posts.filter(post => my_contacts_ids.includes(post.user_id))
      
      return (
        <Grid rows={2}>
         <h1>Members</h1> 
          <Grid.Row>
          <Grid columns={4}>
          {currentUser.my_contacts.map(my_contact => 
            <Grid.Column><Card>
            <NavLink to={`/members/${my_contact.id}`}><img src={my_contact.image} height={300}/></NavLink>
            <Card.Content>
            <Card.Header>{my_contact.name}</Card.Header>
            <a><Icon name='location arrow'/>{my_contact.address}</a><br/>
            <a><Icon name='phone'/>{my_contact.phone}</a><br/>
            <a><Icon name='mail'/>{my_contact.email}</a>
          </Card.Content> 
                 </Card></Grid.Column>) }
                 </Grid>  
                 </Grid.Row>
                 <h1>Posts</h1> 
                 <Grid.Row columns={4}>
                {my_contacts_posts.map(my_contacts_post => <>
                <Grid.Column><NavLink to={`/posts/${my_contacts_post.id}`}><video src={my_contacts_post.video} height={20}/></NavLink></Grid.Column>
                <Grid.Column>{my_contacts_post.content}</Grid.Column>
                <Grid.Column><NavLink to={`/members/${my_contacts_post.user_id}`}>{my_contacts_post.user.name}</NavLink></Grid.Column>
                <Grid.Column>{my_contacts_post.created_at}</Grid.Column></>)}
               </Grid.Row>
                 </Grid>
                     )}
  
  export default withRouter(MyPage)