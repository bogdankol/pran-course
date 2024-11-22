import { useState, useEffect, useMemo } from 'react'
import Container from './components/Container'
import Footer from './components/Footer'
import HashtagList from './components/HashtagList'
import { IItem } from './lib/interfaces'
import FeedbackItemsProvider from './context/FeedbackItemsContext'

function App() {

  

  return (
    <div className='app'>
      <Footer />

      <FeedbackItemsProvider>

        <Container />

        <HashtagList />

      </FeedbackItemsProvider>

    </div>
  )
}

export default App
