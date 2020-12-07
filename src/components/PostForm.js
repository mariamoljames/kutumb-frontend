import React, {useState} from 'react'
import {Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

let PostForm = ({history, onFormSubmit, currentUserId}) => {
  let [state, setState] = useState({
    video: {}, 
    content: "", 
    user_id: currentUserId
  })

  let handleChange = (e) => {
    e.persist()
     if(e.target.type === "file"){
      setState(prevState => ({...prevState, [e.target.name]: e.target.files[0]}))
     }else{
      setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
}

  let handleSubmit = e => {
    e.preventDefault()
    let form = new FormData()
    for (let key in state) {
      form.append(key, state[key]);
    }
    fetch(`http://localhost:3001/posts`, {
      method: "POST",
      body: form
    })
      .then(r => r.json())
      .then(newPost => {
        history.push(`/posts/${newPost.id}`)
        onFormSubmit(newPost)
      })
  }

    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="inline fields">
          <Form.Input label="Message" placeholder="Message" name="content" value={state.content} onChange={handleChange}/>
          <Form.Input label="Attachment" placeholder="Attachment" name="video" type = "file" onChange={handleChange}/>
          <button className="ui button" type="submit">Add Post</button>
          </div>
        </form>
      </div>
    )
  }

export default withRouter(PostForm)