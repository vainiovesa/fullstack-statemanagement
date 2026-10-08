import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdoteControls, useAnecdotes } from '../store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('anecdote store', () => {
  beforeEach(async () => {
    const mockNotes = [
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      },
      {
        "content": "Adding manpower to a late software project makes it later!",
        "id": "21149",
        "votes": 0
      },
      {
        "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "id": "69581",
        "votes": 0
      },
      {
        "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "id": "36975",
        "votes": 8
      },
      {
        "content": "Premature optimization is the root of all evil.",
        "id": "25170",
        "votes": 0
      },
      {
        "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "id": "98312",
        "votes": 0
      }
    ]
    anecdoteService.getAll.mockResolvedValue(mockNotes)
    await useAnecdoteStore.getState().actions.initialize()
  })

  it('anecdotes are initialized', () => {
    expect(useAnecdoteStore.getState().anecdotes.length).toBe(6)
  })

  it('anecdotes are sorted by votes', async () => {
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    const { result: controls } = renderHook(() => useAnecdoteControls())

    const selectedAnecdote = anecdotes.current[3]
    const mockUpdatedAnecdote = { ...selectedAnecdote, votes: selectedAnecdote.votes + 1 }
    anecdoteService.update.mockResolvedValue(mockUpdatedAnecdote)

    const id = anecdotes.current[3].id
    await act(() => controls.current.vote(id))

    let previousVotes = anecdotes.current[0].votes
    for (const anecdote of anecdotes.current) {
      expect(anecdote.votes >= previousVotes)
      previousVotes = anecdote.votes
    }
  })

  it(`voting increases anecdote's number of votes`, async () => {
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    const { result: controls } = renderHook(() => useAnecdoteControls())

    const selectedAnecdote = anecdotes.current[3]
    const mockUpdatedAnecdote = { ...selectedAnecdote, votes: selectedAnecdote.votes + 1 }
    anecdoteService.update.mockResolvedValue(mockUpdatedAnecdote)

    const id = anecdotes.current[3].id
    const votesAtStart = anecdotes.current[3].votes
    await act(() => controls.current.vote(id))

    expect(anecdotes.current.find(a => a.id === id).votes).toBe(votesAtStart + 1)
  })
})

describe('useAnecdotes filtering', () => {
  const anecdotes = [
    {
      "content": "An anecdote.",
      "id": "1",
      "votes": 0
    },
    {
      "content": "Bah, humbug!",
      "id": "2",
      "votes": 5
    },
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: anecdotes })
  })

  it('returns all anecdotes with no filter', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(2)
  })

  it('filters anecdotes', () => {
    useAnecdoteStore.setState({ anecdotes: anecdotes, filter: 'bah' })
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual([anecdotes[1]])
  })
})
