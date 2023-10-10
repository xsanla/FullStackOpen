import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => {
      return b.likes - a.likes;
    });
  });
  return (
    <div>
      <Table striped hover>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>
                <Link to={`/blogs/${blog._id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
