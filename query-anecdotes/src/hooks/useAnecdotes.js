import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

export const useAnecdotes = () => {
  const result = useQuery(
    {
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false
    }
  )

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
