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
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a).toSorted((a1, a2) => a2.votes - a1.votes)
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
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      const sortedAnecdotes = anecdotes.toSorted((a1, a2) => a2.votes - a1.votes)
      set(() => ({ anecdotes: sortedAnecdotes }))
    },
  },
}))

const useNotificationStore = create(set => ({
  notification: '',
  actions: {
    setNotification: (value) => {
      set(() => ({notification: value}))
      setTimeout(() => {
        set(() => ({notification: ''}))
      }, 5000)
    },
  },
}))

export default useAnecdoteStore

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

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationControls = () => useNotificationStore(state => state.actions)
