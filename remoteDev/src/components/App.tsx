import { useEffect, useState } from 'react'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import BookmarksButton from './BookmarksButton'
import Logo from './Logo'
import SearchForm from './SearchForm'
import { HeaderTop } from './Header'
import JobItemContent from './JobItemContent'
import Sidebar from './Sidebar'
import JobList from './JobList'
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SortingControls from './SortingControls'
import { SidebarTop } from './Sidebar'
import { useJobItems } from '../hooks/useJobItems'
import { useDebounce } from '../hooks/useDebounce'
import { Toaster } from 'react-hot-toast'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { IJobItem } from '../types/interfaces'
import { TSortBy, TDirection } from '../types/types'

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<TSortBy>('relevant')

  const debouncedInputValue = useDebounce(inputValue, 500)
  const {isFetching, jobItems} = useJobItems(debouncedInputValue)

  const totalAmountOfItems = jobItems.length
  const totalNumberOfPages = totalAmountOfItems / RESULTS_PER_PAGE
  const jobItemsSorted = [...jobItems]?.sort((a: IJobItem, b: IJobItem) => sortBy === 'relevant' 
    ? b.relevanceScore - a.relevanceScore
    : a.daysAgo - b.daysAgo
  )
  const jobItemsSliced = jobItemsSorted.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE)

  function handlePageChange(direction: TDirection, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(currentPage - 1)
    }
    e.currentTarget.blur()
  }

  function handleChangeSortBy(newSortBy: TSortBy) {
    setSortBy(newSortBy)
    setCurrentPage(1)
  }

	return <>
  
    <Background />

    <Header 
      {...{
        inputValue,
        setInputValue
      }}
    >
      <HeaderTop>
				<Logo />

				<BookmarksButton />
			</HeaderTop>

			<SearchForm 
        {...{
          inputValue,
          setInputValue
        }}
      />
    </Header>

    <Container>
      <Sidebar>
        <SidebarTop>
          <ResultsCount 
            {...{
              totalAmountOfItems
            }}
          />

          <SortingControls 
            {...{
              sortBy,
              onClick: handleChangeSortBy,
            }}
          />
        </SidebarTop>

        <JobList
          {...{
            jobItems: jobItemsSliced,
            isFetching
          }}
        />

        <PaginationControls 
          {...{
            onClick: handlePageChange,
            currentPage,
            totalNumberOfPages
          }}
        />
      </Sidebar>

			<JobItemContent  />
    </Container>

    <Footer />

    <Toaster position='top-right' />
  </>
}

export default App
