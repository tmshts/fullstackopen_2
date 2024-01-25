import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    
    // small amount of data fetching from server
    //onSuccess: () => {
    //  queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    //}
    // huge amount of data fetching from server -> better solution
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      //console.log(error.message)
        notificationDispatch({ type: "SHOW", payload: "too short anecdote, must have length 5 or more" })
        setTimeout(() => {
          notificationDispatch({ type:"REMOVE" })
        }, 5000)
    }    
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: "SHOW", payload: `anecdote '${content}' has just been created` })}
    setTimeout(() => {
      notificationDispatch({ type:"REMOVE" })
    }, 5000)

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
