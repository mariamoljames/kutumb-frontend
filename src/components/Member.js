import React, {useState} from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import {Card, Icon, Button, Confirm} from 'semantic-ui-react'

let Member = ({member, members, onDeleteMember, onAddRelationship, onDeleteRelationship, currentUserId}) => {
  let {id, name, image, phone, email, address, passive_relationships} = member
  let [confirm, setConfirm] = useState(false)
  
  let changeConfirm = () => setConfirm(!confirm)

  let handleDeleteClick = () => {
    fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE"
    })
        .then(r => r.json())
        .then(() => onDeleteMember(id))
}

let Follow = () => {
    fetch(`http://localhost:3001/relationships`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        contact_me_id: currentUserId,
        my_contact_id: id
      })
  })
      .then(r => r.json())
      .then(newR => onAddRelationship(newR))
}

let unFollow = () => {  
  let rId = passive_relationships.find(r => r.contact_me_id === currentUserId).id
    fetch(`http://localhost:3001/relationships/${rId}`, {
      method: "DELETE"
  })
      .then(r => r.json())
      .then(() => onDeleteRelationship(rId, id))
  } 

    return (
        <Card>
        <NavLink to={`/members/${id}`}><img src={image} height={300}/></NavLink>
        <Card.Content>
        <Card.Header>{name}</Card.Header>
        <a><Icon name='location arrow'/>{address}</a><br/>
        <a><Icon name='phone'/>{phone}</a><br/>
        <a><Icon name='mail'/>{email}</a>
      </Card.Content>
      {members.find(member=>member.id===currentUserId) && (
      id===currentUserId
            ? (
              <Card.Content extra>
              <Button primary><Icon name='edit'/></Button>
              <Button onClick={changeConfirm} primary><Icon name='delete'/></Button>
              <Confirm
          open={confirm}
          content='Are you sure you want to delete your contact details?'
          onCancel={changeConfirm}
          onConfirm={handleDeleteClick}
        />
              </Card.Content>
            ) : (
              passive_relationships.find(r => r.contact_me_id === currentUserId)
              ? (
              <Card.Content extra>
                <Button onClick={unFollow} color='green'>Following</Button>
              </Card.Content>
              ) : (
                <Card.Content extra>
                <Button onClick={Follow}>Follow</Button>
              </Card.Content>
              ) ) )}
      </Card>
    )
  }

export default withRouter(Member)