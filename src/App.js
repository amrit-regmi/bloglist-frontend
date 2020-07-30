import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import ToggleButton from './components/ToggleButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [notification,setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const requestBlogs = async () => {
      const result = await blogService.getAll()
      result.sort((a,b) => b.likes-a.likes)
      setBlogs(result)
    }

    requestBlogs()
  }, [])

  useEffect(() => {
    //const sorted = [...blogs].sort((a,b) => b.likes-a.likes)
    //setBlogs(sorted)
    /*Directly modifying the state variable is not a good idea but
    couldn't think of other solution to implement sort on update withot making a query
    */
    blogs.sort((a,b) => b.likes-a.likes)
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const notify = (type,message) => {
    const notify = {
      type: type,
      message: message
    }
    setNotification(notify)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('error','Wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    notify('error','Logged Out')
  }

  const createBlog = async ({ title,author,url }) => {
    try {
      const blog = await blogService.create({ title,author,url })
      const userId = blog.user
      blog.user = {
        name:user.name,
        username:user.username,
        id: userId
      }
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
      notify('success',`A new blog "${blog.title}" added by ${blog.author}`)
    } catch(exception) {
      console.log (exception)
      notify('error','Blog Creation Failed')
    }
  }


  const updateBlog = async (blog) => {
    const blogObject = { id:blog.id, user:blog.user.id, title:blog.title, author:blog.author, url:blog.url, likes:blog.likes+1 }
    try{
      const result = await blogService.update(blogObject)
      setBlogs(blogs.map( b => {
        if(b.id === result.id) {
          b.likes = result.likes
        }
        return b
      }))

    }catch(exception) {
      console.log(exception)
      notify('error','Cannot Update the Blog')
    }
  }

  const deleteBlog = async(blog) => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)){
      try{
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter(b => {
          return b.id !== blog.id
        }))
        notify ('success','Blog removed')
      }catch(exception) {
        notify('error','Couldnot delte the Blog')
      }

    }

  }


  return (
    <>
      <Notification notification = {notification}></Notification>

      {user === null &&
        <LoginForm
          username = {username}
          password = {password}
          setUsername = {setUsername}
          setPassword = {setPassword}
          handleLogin = {handleLogin}
        ></LoginForm>
      }

      { user !== null &&

        <div>
          <h2>blogs</h2>
          {user.name} logged in. <button onClick = {handleLogout}>Logout</button>

          <div>
            <ToggleButton buttonLabelHidden={'Add new Entry'} buttonLabelVisible={'Cancel'} ref={blogFormRef}>
              <BlogForm
                createBlog = {createBlog}
              />
            </ToggleButton>
          </div>


          {blogs.map(blog =>
            <Blog deleteAction = {deleteBlog} updateAction = {updateBlog} key={blog.id} blog={blog} />
          )}
        </div>

      }



    </>
  )
}

export default App