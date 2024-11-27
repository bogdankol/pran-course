import Container from './components/Container'
import Footer from './components/Footer'
import HashtagList from './components/HashtagList'
// import FeedbackItemsProvider from './context/FeedbackItemsContext'
import { feedbackItemsStore } from './stores/feedbackItemsStore'
import { useEffect } from 'react'

function App() {
  const fetchFeedbackItems = feedbackItemsStore(state => state.fetchFeedbackItems)

  useEffect(() => {
    fetchFeedbackItems()
  }, [])

  return (
    <div className='app'>
      <Footer />

      {/* <FeedbackItemsProvider> */}

      <Container />

      <HashtagList />

      {/* </FeedbackItemsProvider> */}

    </div>
  )
}

export default App
