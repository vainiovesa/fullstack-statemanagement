import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
    },
    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) })) 
    },
    setFilter: (value) =>
      set(() => ({
        filter: value
      })
    ),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter !== '') {
    return anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }

  return anecdotes
}
export const useAnecdoteControls = () => useAnecdoteStore(state => state.actions)
