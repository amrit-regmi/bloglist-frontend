import React, { useState } from 'react'
import BlogDetail from './BlogDetail'
import PropTypes from 'prop-types'

const Blog = ({ deleteAction,updateAction,blog }) => {
  const [detailsVisible,setDetailsVisible] = useState(false)


  return (
    <div className = "blog">
      {blog.title} by {blog.author} <button onClick = {() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? 'Hide':'ShowDetails'}</button>
      <BlogDetail deleteAction = {deleteAction} updateAction = {updateAction} blog={blog} visible={detailsVisible}></BlogDetail>
    </div>)
}

Blog.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  updateAction:PropTypes.func.isRequired,
  blog:PropTypes.object.isRequired
}

export default Blog
