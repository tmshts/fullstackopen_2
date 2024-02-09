import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Table } from 'react-bootstrap'

const User = () => {
    const users = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
      return users
    })

    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (!user) {
        return null
      }
    
    const blogs = user.blogs

    if (blogs.length === 0) {
        return (
            <div>
                <h4>The user {user.name} has not added any blogs.</h4>
            </div>
        )
      }

    return (
      <div>
            <h2>{user.name} added following blogs</h2>

            <Table striped>

              <tbody>

                {blogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            {blog.title}
                        </td>
                    </tr>
                ))}

              </tbody>

            </Table>

      </div>
    )
  }

  export default User