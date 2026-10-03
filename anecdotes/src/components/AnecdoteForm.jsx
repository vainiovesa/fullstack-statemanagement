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
    <div data-testid="anecdote-form">
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

export default AnecdoteForm
