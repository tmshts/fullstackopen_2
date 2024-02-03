import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls the event handler it received as props with the right details when a new blog is created.', async () => {
    const mockCreateBlog = jest.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const user_event = userEvent.setup()

    const input_title = screen.getByPlaceholderText('title')
    const input_author = screen.getByPlaceholderText('author')
    const input_url = screen.getByPlaceholderText('url')

    const create_button = screen.getByText('create')

    await user_event.type(input_title, 'Ceska Republika')
    await user_event.type(input_author, 'Vaclav Havel')
    await user_event.type(input_url, 'www.cr.cz')

    await user_event.click(create_button)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('Ceska Republika')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('Vaclav Havel')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('www.cr.cz')
})
