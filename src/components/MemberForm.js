import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Grid, Header, Icon, Form, Segment} from 'semantic-ui-react'

let locations = [
  { key: 'Asia', value: 'Asia', text: 'Asia' },
  { key: 'Africa', value: 'Africa', text: 'Africa' },
  { key: 'Americas', value: 'Americas', text: 'Americas' },
  { key: 'Europe', value: 'Europe', text: 'Europe' },
  { key: 'Australia', value: 'Australia', text: 'Australia'}
]
let MemberForm = ({history, onFormSubmit}) => {
  let [state, setState] = useState({
    image: {}, 
    name: "", 
    location: "", 
    phone: "", 
    email: "", 
    address: ""
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
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      body: form
    })
      .then(r => r.json())
      .then(newMember => {
        history.push(`/members/${newMember.id}`)
        onFormSubmit(newMember)
      })
  }

    let {name, phone, email, address, location} = state
    return (
      <Grid textAlign='center' style={{ height: '100vh' }}>
    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
        <Icon name='user'/> New Member
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
        <Form.Input label="Name" placeholder="Name" name="name" value={name} onChange={handleChange} required/>
            <Form.Input label="Phone" placeholder="Phone" name="phone" value={phone} onChange={handleChange} required/>
            <Form.Input label="Email" placeholder="Email" name="email" value={email} onChange={handleChange} required/>
            <Form.Input label="Address" placeholder="Address" name="address" value={address} onChange={handleChange}/>
            <Form.Select label="Location" placeholder="Select" name="location" value={location} onChange={handleDropdown} options={locations}/>
            <Form.Input label="Image" placeholder="Image" name="image" type = "file" onChange={handleChange}/>
            <Form.Button>Submit</Form.Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
  }

export default withRouter(MemberForm)