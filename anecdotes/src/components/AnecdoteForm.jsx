import { useAnecdoteControls, useNotificationControls } from '../store'

const AnecdoteForm = () => {
  const { create } = useAnecdoteControls()
  const { setNotification } = useNotificationControls()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    create(anecdote)
    setNotification(`You created '${anecdote}'`)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
