import { useState } from 'react'
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

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [isFetching, jobItems] = useJobItems(inputValue)
  ';asdsadasdasdasdssad'

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
          <ResultsCount />

          <SortingControls />
        </SidebarTop>

        <JobList
          {...{
            jobItems,
            isFetching
          }}
        />

        <PaginationControls />
      </Sidebar>

			<JobItemContent />
    </Container>

    <Footer />
  </>
}

export default App
