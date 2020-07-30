import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( { createBlog }) => {
  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [author,setAuthor] = useState('')

  const addBlog =  (event) => {
    event.preventDefault()
    createBlog( { title,author,url })
    setUrl('')
    setAuthor('')
    setTitle('')
  }


  return(
    <div>
      <h2>Create New </h2>
      <form>
        <div>
      Title: <input type='text'
            value= {title}
            name ='title'
            onChange = {({ target }) => setTitle(target.value)}>
          </input>
        </div>
        <div>
      Author:   <input type='text'
            value= {author}
            name ='author'
            onChange = {({ target }) => setAuthor(target.value)}>
          </input>
        </div>
        <div>
      Url:   <input type='text'
            value= {url}
            name ='url'
            onChange = {({ target }) => setUrl(target.value)}>
          </input>
        </div>
        <button type='submit' onClick = { addBlog }>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm