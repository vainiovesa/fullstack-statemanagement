import { useAnecdotes, useAnecdoteControls, useNotificationControls } from "../store"

const RemoveButton = ({ remove, id }) => <button onClick={() => remove(id)}>delete</button>

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteControls()
  const { setNotification } = useNotificationControls()

  const voteAction = ({ id, content }) => {
    vote(id)
    setNotification(`You voted '${content}'`)
  }

  return (
    <div>
      {anecdotes.toSorted((a1, a2) => a2.votes - a1.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAction(anecdote)}>vote</button>
            {anecdote.votes === 0 && <RemoveButton remove={remove} id={anecdote.id}/>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
