import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />' , () => {
  let component
  let updateAction
  let deleteAction

  beforeEach( () => {

    const blog ={
      title:'Testing Title',
      author:'Testing Author',
      url:'Test Url',
      likes:'0',
      user:{
        username:'testuser'
      }
    }

    updateAction = jest.fn()
    deleteAction = jest.fn()
    component = render(
      <Blog blog = {blog} updateAction = {updateAction} deleteAction = {deleteAction}></Blog>
    )

  })

  test(' at start renders the blog title and author, but does not render its url or number of likes ', () => {


    expect(component.container).toHaveTextContent('Testing Title by Testing Author')
    const div = component.container.querySelector('.blog_detail')
    expect(div).toHaveStyle('display:none')
  })

  test('blogurl and number of likes are shown when the button controlling the shown details has been clicked', () => {


    const button = component.getByText('ShowDetails')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog_detail')
    expect(div).not.toHaveStyle('display:none')

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateAction.mock.calls).toHaveLength(2)

  })

})

describe('<BlogForm />',() => {
  test('calls the event handler with the right details when a new blog is called',() => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog}></BlogForm>)

    const author = component.container.querySelector('[name="author"]')
    const title = component.container.querySelector('[name="title"]')
    const url = component.container.querySelector('[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Author Name' }
    })
    fireEvent.change(title, {
      target: { value: 'Title name' }
    })
    fireEvent.change(url, {
      target: { value: 'link' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Author Name')
    expect(createBlog.mock.calls[0][0].title).toBe('Title name')
    expect(createBlog.mock.calls[0][0].url).toBe('link')

  })

})

