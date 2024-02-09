import { Link } from 'react-router-dom'

const Users = ({ users }) => (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
                <tr>
                    <td> </td>
                    <td>
                        <div><b>blogs created</b></div>
                    </td>
                </tr>
            </tbody>
            <tbody>
                {users.map(user =>
                <tr key={user.id}>
                    <td>
                        <Link to={`/users/${user.id}`}>
                            {user.name}
                        </Link>
                    </td>
                    <td>
                        {user.blogs.length}
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    </>
)

export default Users