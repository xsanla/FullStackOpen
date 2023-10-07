import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@testing-library/react'
import Blog from './Blog'

beforeEach(async () => {
    const user = {
        username: "apina",
        _id: "123123123123123"
    }
    window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
    )
})
test('renders content', () => {
    const user = {
        username: "apina",
        _id: "123123123123123"
    }
    const blog = {
        title: "testing123",
        author: "testari",
        url: "testiUrli",
        user: user,
        likes: 5
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText("testing123 testari")
    expect(element).toBeDefined()
})

test('renders adittional content when view button pressed', async () => {
    const userData = {
        username: "apina",
        _id: "123123123123123"
    }
    const blog = {
        title: "testing123",
        author: "testari",
        url: "testiUrli",
        user: userData,
        likes: 5
    }
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} like={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const detailsDiv = container.querySelector('.details')
    expect(detailsDiv).toBeDefined()
})

test('pressing like button twice calls the eventhandler twice', async () => {
    const userData = {
        username: "apina",
        _id: "123123123123123"
    }
    const blog = {
        title: "testing123",
        author: "testari",
        url: "testiUrli",
        user: userData,
        likes: 5
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} like={mockHandler} />)

    const user = userEvent
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await act(async () => {
        await user.click(likeButton)
    })
    await act(async () => {
        await user.click(likeButton)
    })

    expect(mockHandler.mock.calls).toHaveLength(2)
})