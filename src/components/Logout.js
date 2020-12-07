import React from 'react'
import { NavLink,withRouter} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'

let Login = ({history}) => {
  let delay = (e) => {
    e.preventDefault()
    setTimeout(() => {
        history.push('/members')
    },2000)
}
    return(
  <Grid className='background' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <h2 style={{ color: "red" }}>You have been successfully logged out</h2>
      <Header as='h2' color='black' textAlign='center'>
        <Icon name='key'/> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button color='black' fluid size='large'><NavLink to='/members' onClick={delay}>Login</NavLink></Button>
        </Segment>
      </Form>
      <Message>
        New member? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)
  }

export default withRouter(Login)