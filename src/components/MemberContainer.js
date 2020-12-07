import React, {useState} from 'react'
import Member from './Member'
import Pager from './Pager'
import LocationPicker from './LocationPicker'
import {Card} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

let MemberContainer = ({searchTerm, members, onDeleteMember, onAddRelationship, onDeleteRelationship, currentUserId}) => {
  let [selectedLocation, setSelectedLocation] = useState("All")
  let [currentIndex, setCurrentIndex] = useState(0)
  let [sortDown, setSortDown] = useState(false)
  let [sortUp, setSortUp] = useState(false)

  let handleUpdateLocation = newLocation => {
    setSelectedLocation(newLocation)
    setCurrentIndex(0)
  }
  
  let handlePageClick = page => setCurrentIndex((page - 1)*8)

  let handleSortDown = () => setSortDown(!sortDown)
  let handleSortUp = () => setSortUp(!sortUp)
  let sortMembers = (filteredMembers) => {
    if(sortDown) {
      return filteredMembers.sort((m1,m2)=>m1.name.localeCompare(m2.name))
    }else if(sortUp){
      return filteredMembers.sort((m1,m2)=>m2.name.localeCompare(m1.name))
    }else{
      return filteredMembers
    }
  }
   
    let filteredMembers = members
      .filter(member => selectedLocation === "All" || member.location === selectedLocation)
      .filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
    let sortedMembers = sortMembers(filteredMembers)
    let renderMembers = sortedMembers
        .slice(currentIndex, currentIndex+8)
        .map(member => 
          <Member
          key={member.id}
          member={member}
          members={members}
          onDeleteMember={onDeleteMember}
          onAddRelationship={onAddRelationship}
          onDeleteRelationship={onDeleteRelationship}
          currentUserId={currentUserId}
        />
      )
     let currentPage = (currentIndex/8) + 1
    let totalPages = Math.ceil(sortedMembers.length/8)
    
    return (
        <>
            <LocationPicker 
            selectedLocation={selectedLocation} 
            onLocationChange={handleUpdateLocation} 
            onSortDown={handleSortDown} 
            onSortUp={handleSortUp}
            />
          {sortedMembers.length > 0 ? 
                (<>
                <Card.Group itemsPerRow={4}>{renderMembers}</Card.Group>   
                <Pager currentPage={currentPage} totalPages={totalPages} onPageClick={handlePageClick}/>         
                </>) 
            : (<h1>No results found!</h1>)}     
        </>
    )
  }

export default withRouter(MemberContainer)