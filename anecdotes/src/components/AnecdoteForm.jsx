import { useAnecdoteControls } from "./store"

const AnecdoteForm = () => {
  const { create } = useAnecdoteControls()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.new.value
    create(anecdote)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
