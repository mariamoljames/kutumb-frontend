import React from 'react'
import {withRouter} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'

let Pager = ({currentPage, totalPages, onPageClick}) => {
  let pageButtons = Array(totalPages) 
    .fill()                               
    .map((_, index) => index + 1)        
    .map(page => (                       
    <button
        key={page}
        disabled={page === currentPage}
        onClick={() => onPageClick(page)}
      >{page}</button>
    ))

  return (
    <Segment textAlign='center'>
      <p>Showing page {currentPage} of {totalPages}</p>
      <div>
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageClick(currentPage - 1)}
        >Prev</button>
        {pageButtons}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageClick(currentPage + 1)}
        >Next</button>
      </div>
    </Segment>
  )
  }

export default withRouter(Pager)