import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useAnecdoteControls } from './store'
import { useEffect } from 'react'

const App = () => {
  const { initialize } = useAnecdoteControls()
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
