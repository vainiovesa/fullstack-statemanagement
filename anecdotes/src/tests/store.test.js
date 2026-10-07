import { beforeEach, describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAnecdoteStore, { useAnecdoteControls, useAnecdotes } from '../store'

beforeEach(async () => {
  await useAnecdoteStore.getState().actions.initialize()
})

describe('anecdote store', () => {
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
})
