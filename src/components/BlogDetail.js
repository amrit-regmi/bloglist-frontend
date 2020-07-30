import React from 'react'
import PropTypes from 'prop-types'

const BlogDetail = ({ deleteAction,updateAction,blog,visible }) => {
  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username

  const deleteButton = (blog,currentUser) => {
    if(currentUser === blog.user.username){
      return (<button onClick ={() => deleteAction(blog) }>Delete</button>)
    }
    return null
  }

  const visibility = { display: visible ? '':'none' }
  return (

    <div style={visibility} >{blog.url} <br></br>
      Likes: {blog.likes} <button onClick = { () => updateAction(blog)}> Like</button><br></br>
      Posted By: {blog.user.name }<br></br>
      {deleteButton(blog,currentUser)}
    </div>


  )

}

BlogDetail.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  updateAction:PropTypes.func.isRequired,
  blog:PropTypes.object.isRequired,
  visible:PropTypes.bool.isRequired
}
export default BlogDetail
