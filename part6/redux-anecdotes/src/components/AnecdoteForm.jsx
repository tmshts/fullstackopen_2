import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'



const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        //console.log(content)
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))

        // dispatch(createAnecdote(content))
        dispatch(showNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
          }, 5000)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm