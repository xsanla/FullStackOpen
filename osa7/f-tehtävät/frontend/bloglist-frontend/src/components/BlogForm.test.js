import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@testing-library/react'
import Blog from './Blog'

test('Blogform calls the callback function provided with the right data', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm handleCreateNew={createBlog}/>)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('Create')

    await user.type(inputs[0], "testing1")
    await user.type(inputs[1], "testing2")
    await user.type(inputs[2], "testing3")
    await user.click(sendButton)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({title:"testing1", author:"testing2", url:"testing3"})
})