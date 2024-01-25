import { createContext, useReducer } from 'react'

/* in case of 1 file
const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
          state = action.payload
          return state
      case "REMOVE":
          return null
      default:
          return state
    }
  }
*/

const NotificationContext = createContext()

/* in case of 1 file
export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]} >
            {props.children}
        </NotificationContext.Provider>
    )
}
*/

export default NotificationContext