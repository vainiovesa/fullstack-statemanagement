import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useCounterStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0,

  actions: {
    good: () =>
      set(state => ({
        good: state.good + 1,
        all: state.all + 1,
        average: ((state.good + 1) - state.bad) / (state.all + 1),
        positive: (state.good + 1) * 100 / (state.all + 1),
      })),
    neutral: () =>
      set(state => ({
        neutral: state.neutral + 1,
        all: state.all + 1,
        average: (state.good - state.bad) / (state.all + 1),
        positive: (state.good) * 100 / (state.all + 1),
      })),
    bad: () =>
      set(state => ({
        bad: state.bad + 1,
        all: state.all + 1,
        average: (state.good - (state.bad + 1)) / (state.all + 1),
        positive: (state.good) * 100 / (state.all + 1),
      })),
  },
}))

export const useCounterControls = () => useCounterStore(state => state.actions)
export const useValues = () =>
  useCounterStore(
    useShallow(state => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad,
      all: state.all,
      average: state.average,
      positive: state.positive,
    }))
  )
