import { useAnecdotes, useAnecdoteControls } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, create } = useAnecdoteControls()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.new.value
    create(anecdote)
    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
