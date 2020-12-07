import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import NavBar from './NavBar';
import MemberContainer from './MemberContainer';
import MemberForm from './MemberForm';
import Login from './Login'
import Logout from './Logout'
import MemberDetail from './MemberDetail'
import PostContainer from './PostContainer';
import PostDetail from './PostDetail';
import MyPage from './MyPage';

let App = () => {
  let [searchTerm, setSearchTerm] = useState("") 
  let [members, setMembers] = useState([]) 
  let [currentUserId, setCurrentUserId] = useState(15) 

  useEffect(() => {
    fetch('http://localhost:3001/users')
   .then(r => r.json())
    .then(members => setMembers(members))
    },[])

  let handleSearchChange = searchTerm => setSearchTerm(searchTerm)

  let handleAddMember = newMember => setMembers(prevMembers => [newMember, ...prevMembers])
  
  let handleDeleteMember = id => setMembers(prevMembers => {
        let filteredMembers = prevMembers.filter(member => member.id !== id)
        return filteredMembers
      })

  let handleUpdateMember = updatedMember => setMembers(prevMembers => {
    let updatedMembers = prevMembers.map(member => {
        if (member.id === updatedMember.id) return updatedMember
        return member
      })
      return updatedMembers 
    })

    let handleAddRelationship = newR => setMembers(prevMembers => {
      let updatedMembers = prevMembers.map(member => {
          if (member.id === newR.my_contact_id) {
            let updatedMember = {...member}
            updatedMember.passive_relationships.push(newR)
            let newContactMe = members.find(member => member.id === newR.contact_me_id)
            updatedMember.contact_mes.push(newContactMe)
            return updatedMember
          }else if (member.id === newR.contact_me_id) {
            let updatedMember = {...member}
            updatedMember.active_relationships.push(newR)
            let newMyContact = members.find(member => member.id === newR.my_contact_id)
            updatedMember.my_contacts.push(newMyContact)
            return updatedMember
          }
          return member
        })
        return updatedMembers 
      })  

      let handleDeleteRelationship = (rId, mId) => setMembers(prevMembers => {
        let updatedMembers = prevMembers.map(member => {
            if (member.passive_relationships.find(r => r.id === rId)) {
              let updatedMember = {...member}
              updatedMember.passive_relationships = updatedMember.passive_relationships.filter(r => r.id !== rId)
              updatedMember.contact_mes = updatedMember.contact_mes.filter(contact_me => contact_me.id !== currentUserId)
              return updatedMember
            }else if (member.active_relationships.find(r => r.id === rId)) {
              let updatedMember = {...member}
              updatedMember.active_relationships = updatedMember.active_relationships.filter(r => r.id !== rId)
              updatedMember.my_contacts = updatedMember.my_contacts.filter(my_contact => my_contact.id !== mId)
              return updatedMember
            }
            return member
          })
          return updatedMembers 
        })

    let handleAddPost = newPost => setMembers(prevMembers => {
      let updatedMembers = prevMembers.map(member => {
          if (member.id === newPost.user_id) {
            let updatedMember = {...member}
            updatedMember.posts.push(newPost)
            return updatedMember
          }
          return member
        })
        return updatedMembers 
      })

    return (
      <>
        <NavBar 
        onSearchChange={handleSearchChange} 
        searchTerm={searchTerm} />

        <main>
          <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>

          <Route exact path="/mypage" render={routeProps => 
            <MyPage {...routeProps} 
            members={members}
            currentUserId={currentUserId}/>}/>

            <Route exact path="/members" render={routeProps => 
              <MemberContainer {...routeProps}
            searchTerm={searchTerm}
            members={members} 
            onDeleteMember={handleDeleteMember}
            onAddRelationship={handleAddRelationship}
            onDeleteRelationship={handleDeleteRelationship}
            currentUserId={currentUserId}/>}/>

            <Route exact path="/members/new" render={routeProps => 
            <MemberForm {...routeProps} 
            onFormSubmit={handleAddMember}/>}/>

          <Route exact path="/members/:id" render={routeProps => 
            <MemberDetail {...routeProps}
            members={members}
            onUpdateMember={handleUpdateMember}
            currentUserId={currentUserId}/>}/>

          <Route exact path="/posts" render={routeProps => 
              <PostContainer {...routeProps}
              members={members}
              onFormSubmit={handleAddPost}
              currentUserId={currentUserId}/>}/>

            <Route exact path="/posts/:id" render={routeProps => 
              <PostDetail {...routeProps}/>}/>

            <Route path='*' render={() => <Redirect to= "/login" />} />

          </Switch>
        </main>
      </>
    );
}

export default withRouter(App);