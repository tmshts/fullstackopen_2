import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

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
            <h2>{user.name}</h2>

            <h4><b>added blogs</b></h4>

                {blogs.map((blog) => (
                    <div key={blog.id}>
                        <ul>
                            <li>{blog.title}</li>
                        </ul>
                    </div>
                ))}
      </div>
    )
  }

  export default User