import React, {useState, useEffect} from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import {Button, Image, Icon, List, Grid} from 'semantic-ui-react'
import EditMember from './EditMember';
import LoadingScreen from './LoadingScreen'

let MemberDetail = ({match, onUpdateMember, members, currentUserId}) => {
  let [member, setMember] = useState(null)
  let [isEditing, setIsEditing] = useState(false)
  
  let memberId=match.params.id
  useEffect(() => {
    fetch(`http://localhost:3001/users/${memberId}`)
      .then(r => r.json())
      .then(member => setMember(member))
  },[memberId])

  let handleEditClick = () => setIsEditing(!isEditing)

  let handleUpdateMember = updatedMember => {
    onUpdateMember(updatedMember)
    setIsEditing(!isEditing)
  }

  if(!member) return <LoadingScreen />
  let {id, image, name, location, phone, email, address, my_contacts, contact_mes, posts} = member
  
    return(
      isEditing
        ? (<EditMember
            member={member}
            onUpdateMember={handleUpdateMember}/>
        )  : (
      <div class="ui segment">
        <div class="ui two column very relaxed grid">
          <div class="column">
               <Image src={image} alt={name} size='big'/>
          </div>
        <div class="column">
          <Grid columns={2}>
            <Grid.Column>
            <h1>{name}</h1> 
            <h3>{location}</h3>
            <p><a><Icon name='phone'/>{phone}</a></p>
            <p><a><Icon name='mail'/>{email}</a></p>
            <p><a><Icon name='location arrow'/>{address}</a></p>
            {members.find(member=>member.id===currentUserId) && (
            id===currentUserId
            ? (
              <>
              <Button onClick={handleEditClick} primary><Icon name='edit'/></Button>
              <Button primary><Icon name='delete'/></Button>
              </>
            ) : (
              contact_mes.find(contact_me => contact_me.id === currentUserId)
              ? (
                <Button color='green'>Following</Button>    
              ) : (
                <Button>Follow</Button>
              ) ) )}
          <h3>following {my_contacts.length}</h3>
          <List bulleted>
          {my_contacts.map(my_contact => <List.Item><NavLink key={my_contact.id} to={`/members/${my_contact.id}`}><h4>{my_contact.name}</h4></NavLink></List.Item>)}
          </List>
          <h3>followers {contact_mes.length}</h3>
          <List bulleted>
          {contact_mes.map(contact_me => <List.Item><NavLink key={contact_me.id} to={`/members/${contact_me.id}`}><h4>{contact_me.name}</h4></NavLink></List.Item>)}
          </List>    
          </Grid.Column>
          <Grid.Column>
          <h3>Posts {posts.length}</h3>  
          <List bulleted>
          {posts.map(post => <List.Item><NavLink key={post.id} to={`/posts/${post.id}`}><h4>{post.content}</h4></NavLink></List.Item>)}
          </List> 
          </Grid.Column>
          </Grid>
    </div>
  </div>
</div>
    ))}

export default withRouter(MemberDetail)