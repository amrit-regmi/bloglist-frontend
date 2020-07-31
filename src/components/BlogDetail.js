import React from 'react'
import PropTypes from 'prop-types'

const BlogDetail = ({ deleteAction,updateAction,blog,visible }) => {
  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser')) || null

  const deleteButton = (blog,currentUser) => {
    if(currentUser !== null && currentUser.username === blog.user.username){
      return (<button id="btn_delete" onClick ={() => deleteAction(blog) }>Delete</button>)
    }
    return null
  }

  const visibility = { display: visible ? '':'none' }
  return (

    <div className = 'blog_detail' style={visibility} >{blog.url} <br></br>
      Likes: <span className ="likes">{blog.likes}</span> <button  id ="btn_like" onClick = { () => updateAction(blog)}> Like</button><br></br>
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
