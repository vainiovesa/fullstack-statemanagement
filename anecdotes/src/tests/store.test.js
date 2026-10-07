import { beforeEach, describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAnecdoteStore, { useAnecdoteControls, useAnecdotes } from '../store'


describe('anecdote store', () => {
  beforeEach(async () => {
    await useAnecdoteStore.getState().actions.initialize()
  })

  it('anecdotes are initialized', () => {
    expect(useAnecdoteStore.getState().anecdotes.length).toBe(6)
  })

  it('anecdotes are sorted by votes', async () => {
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    const { result: controls } = renderHook(() => useAnecdoteControls())

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
