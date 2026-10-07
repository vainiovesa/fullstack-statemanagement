import { beforeEach, describe, expect, it } from 'vitest'
import useAnecdoteStore from '../store'

beforeEach(async () => {
  await useAnecdoteStore.getState().actions.initialize()
})

describe('anecdote store', () => {
  it('anecdotes are initialized', () => {
    expect(useAnecdoteStore.getState().anecdotes.length).toBe(6)
  })
})
