import React, {useState} from 'react'
import {Form, Grid, Header, Icon, Segment, Image} from 'semantic-ui-react'
import { withRouter} from 'react-router-dom'

let locations = [
  { key: 'Asia', value: 'Asia', text: 'Asia' },
  { key: 'Africa', value: 'Africa', text: 'Africa' },
  { key: 'Americas', value: 'Americas', text: 'Americas' },
  { key: 'Europe', value: 'Europe', text: 'Europe' },
  { key: 'Australia', value: 'Australia', text: 'Australia'}
]
let EditMember = ({member, onUpdateMember, history}) => {
  let {id, image, name, location, phone, email, address} = member
  let [state, setState] = useState({
    image: image, 
    name: name, 
    location: location, 
    phone: phone, 
    email: email, 
    address: address
  })

  let handleChange = (e) => {
    e.persist()
     if(e.target.type === "file"){
      setState(prevState => ({...prevState, [e.target.name]: e.target.files[0]}))
     }else{
      setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
}

  let handleDropdown = (e, data) => setState(prevState => ({...prevState, [data.name]: data.value}))


  let handleSubmit = e => {
    e.preventDefault()
    let form = new FormData()
    for (let key in state) {
      form.append(key, state[key]);
    }
    fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      body: form
    })
      .then(r => r.json())
      .then(updatedMember => {
        history.push(`/members/`)
        onUpdateMember(updatedMember)
      })
  }
  
    return (
      <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
      <Image src={image} alt={name} size='big'/>
      </Grid.Column>
      <Grid.Column>
      <Grid textAlign='center' style={{ height: '100vh' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
        <Icon name='user'/> Edit Member
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
        <Form.Input label="Name" placeholder="Name" name="name" value={state.name} onChange={handleChange} required/>
            <Form.Input label="Phone" placeholder="Phone" name="phone" value={state.phone} onChange={handleChange} required/>
            <Form.Input label="Email" placeholder="Email" name="email" value={state.email} onChange={handleChange} required/>
            <Form.Input label="Address" placeholder="Address" name="address" value={state.address} onChange={handleChange}/>
            <Form.Select label="Location" placeholder="Select" name="location" value={state.location} onChange={handleDropdown} options={locations}/>
            <Form.Input label="Image" placeholder="Image" name="image" type = "file" onChange={handleChange}/>
            <Form.Button>Submit</Form.Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
      </Grid.Column>
    </Grid>
  </Segment>
    
    )
  }

export default withRouter(EditMember)