import { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then((response) => {
        setData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td><Link to={`/users/${val.id}`}>{val.username}</Link></td>
                <td>{val.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
