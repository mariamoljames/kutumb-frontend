import React, {useState} from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import {Segment, Menu, Input, Icon} from 'semantic-ui-react'

let NavBar = ({searchTerm, onSearchChange, location, history}) =>{
  let [activeItem, setactiveItem] = useState('members')
  let handleItemClick = (e, { name }) => setactiveItem(name)
  let delay = (e) => {
    e.preventDefault()
    setTimeout(() => {
        history.push('/logout')
    },1000)
}

   return (
    location.pathname==="/login" || location.pathname==="/logout" || location.pathname==="*"
    ? false
    :<Segment>
    <Menu inverted widths={8}>
    <Menu.Item header><h1>KUTUMB<Icon name='users'/></h1></Menu.Item>
    <Menu.Item>
          <Input icon='search' placeholder='Search Members...' 
            value={searchTerm}
            onChange={event => onSearchChange(event.target.value)}
          />
      </Menu.Item>
      <Menu.Item name='members' active={activeItem === 'members'} onClick={handleItemClick}><NavLink to="/members">Members</NavLink></Menu.Item>
      <Menu.Item name='posts' active={activeItem === 'posts'} onClick={handleItemClick}><NavLink to="/posts">Posts</NavLink></Menu.Item>
      <Menu.Item name='mypage' active={activeItem === 'mypage'} onClick={handleItemClick}><NavLink to="/mypage">My Page</NavLink></Menu.Item>
      <Menu.Item name='new' active={activeItem === 'new'} onClick={handleItemClick}><NavLink to="/members/new">Add Member</NavLink></Menu.Item>
      <Menu.Item name='logout' active={activeItem === 'logout'} onClick={handleItemClick}><NavLink to="/logout" onClick={delay}>Logout</NavLink></Menu.Item>
      <Menu.Item header><h3><Icon name='user'/>Logged in as maria</h3></Menu.Item>
    </Menu>
    </Segment>
    )
 }

export default withRouter(NavBar)