import React from 'react'
import AppProviders from '../AppProviders'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import { BASE_URL } from '../constants/content'
import { withTrailingSlash } from '../helpers/url'

export type PreviewProviderProps = {
  children: React.ReactNode
}
export default function PreviewProviders({ children }: PreviewProviderProps) {
  const source = createMemorySource(withTrailingSlash(BASE_URL))
  const history = createHistory(source)

  return (
    <AppProviders>
      <LocationProvider history={history}>{children}</LocationProvider>
    </AppProviders>
  )
}
