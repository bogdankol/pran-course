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
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SortingControls from './SortingControls'
import { SidebarTop } from './Sidebar'
import { Toaster } from 'react-hot-toast'
import JobListSearch from './JobListSearch'

function App() {

	return ( 
		<>
			<Background />

			<Header>
				<HeaderTop>
					<Logo />

					<BookmarksButton />
				</HeaderTop>

				<SearchForm />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount />

						<SortingControls />
					</SidebarTop>

          <JobListSearch />

					<PaginationControls />
				</Sidebar>

				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position='top-right' />
		</>
	)
}

export default App
