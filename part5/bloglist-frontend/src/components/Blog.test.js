import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {

  let container

  const blog = {
    title: 'new title',
    author: 'new author',
    url: 'new url',
    likes: 1,
    user: {
      name: 'tomas',
      username: 'tomas',
      id: '653d22ad0fa60ddfff9b5ad8'
    }
  }
  const user = {
    name: 'tomas',
    username: 'tomas',
    id: '653d22ad0fa60ddfff9b5ad8'
  }

  const mockUpdateLikes = jest.fn()
  const mockDeleteBlog = jest.fn()

  // not working with beforeEach()
  /*
  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
        user={user}
      />).container
  })
  */


  test('Blog displaying a blog\'s title and author by default -> with toHaveTextContent() will be the element found even if the display is none or block', () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    //screen.debug()
    const title_and_url_div = container.querySelector('.title_and_url_div')
    expect(title_and_url_div).toHaveTextContent('new title new author')
  })


  test('Blog displaying a blog\'s title and author by default - with toBeVisible()', () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    const title_and_url_div = container.querySelector('.title_and_url_div')
    expect(title_and_url_div).toBeVisible()
  })


  test('Blog not displaying a blog\'s url and number of likes by default - with toHaveStyle()', () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    const url_and_likes_div = container.querySelector('.url_and_likes_div')
    expect(url_and_likes_div).toHaveStyle('display: none')
  })

  test('Blog not displaying a blog\'s url and number of likes by default - with toBeVisible()', () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    const url_and_likes_div = container.querySelector('.url_and_likes_div')
    expect(url_and_likes_div).not.toBeVisible()
  })


  test('After clicking the button, blog displaying a blog\'s url and number of likes - version 1', async () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    const user_event = userEvent.setup()
    const button = screen.getByText('view')
    await user_event.click(button)

    const url_and_likes_div = container.querySelector('.url_and_likes_div')
    expect(url_and_likes_div).not.toHaveStyle('display: none')
  })

  test('After clicking the button, blog displaying a blog\'s url and number of likes - version 2', async () => {

    container = render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} loggedUser={user}/>).container

    const user_event = userEvent.setup()
    const button = screen.getByText('view')
    await user_event.click(button)

    const url_and_likes_div = container.querySelector('.url_and_likes_div')
    expect(url_and_likes_div).toHaveStyle('display: block')
  })

})