import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector((state) => {
        return ([...state.blogs].sort((a, b) => {
            return b.likes - a.likes
        }))
    })

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog._id} blog={blog}></Blog>
            )}
        </div>
    )
}

export default BlogList