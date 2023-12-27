import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = (id) => {
      // console.log('vote', id)
      dispatch(addVote(id))
    }

    
    // destructuring the fields of state
    const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === 'ALL' ) {
        // console.log('no filter')
        return anecdotes
    }

    // console.log('filter used')
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    
    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
          </div>
    )
}

export default AnecdoteList