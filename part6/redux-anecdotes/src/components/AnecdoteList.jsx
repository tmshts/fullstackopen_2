import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      // const id = anecdote.id
      // const content = anecdote.content
      const { id, content } = anecdote
      dispatch(addVote(id))
      dispatch(showNotification(`you voted '${content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }

    
    // destructuring the fields of state
    const anecdotes = useSelector(({ anecdotes, filter }) => {
    
        if ( filter === '' ) {
        return anecdotes
        }

        // Filter used
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    return (
        <div>
            {anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
          </div>
    )
}

export default AnecdoteList