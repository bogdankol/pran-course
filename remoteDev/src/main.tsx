import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BookmarksContextProvider from './contexts/BookmarksContextProvider.tsx'
import ActiveIdContextProvider from './contexts/activeIdContextProvider.tsx'
import SearchTextProvider from './contexts/searchTextContextProvider.tsx'
import JobItemsContextProvider from './contexts/JobItemsContextProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ActiveIdContextProvider>
				<BookmarksContextProvider>
          <SearchTextProvider>
            <JobItemsContextProvider>
					    <App />
            </JobItemsContextProvider>
          </SearchTextProvider>
				</BookmarksContextProvider>
			</ActiveIdContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
