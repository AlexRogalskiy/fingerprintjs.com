// source: https://usehooks-typescript.com/use-fetch/
import { useEffect, useReducer, useRef } from 'react'
import { getErrorMessage } from '../helpers/error'

interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched'
  data?: T
  error?: string
}

interface Cache<T> {
  [url: string]: T
}

type Action<T> = { type: 'request' } | { type: 'success'; payload: T } | { type: 'failure'; payload: string }

export function useFetch<T = unknown>(url?: string, options?: Record<string, unknown>): State<T> {
  const cache = useRef<Cache<T>>({})
  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  }
  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' }
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  useEffect(() => {
    if (!url) return

    let cancelRequest = false

    const fetchData = async () => {
      dispatch({ type: 'request' })
      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] })
      } else {
        try {
          const response = await fetch(url, options)
          const data = await response.json()

          cache.current[url] = data

          if (cancelRequest) return

          dispatch({ type: 'success', payload: data })
        } catch (error) {
          if (cancelRequest) return
          dispatch({ type: 'failure', payload: getErrorMessage(error) })
        }
      }
    }
    fetchData()
    return () => {
      cancelRequest = true
    }
  }, [url, options])
  return state
}
