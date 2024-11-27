import { useContext, useEffect, useState } from 'react'
import {FeedbackItemsContext} from '../context/FeedbackItemsContext'
import { IItem } from '../lib/interfaces'

export default function useFeedbackItemsContextHook() {

  const context  = useContext(FeedbackItemsContext)
  
  if(!context) throw new Error('FeedbackItemsContext is null')
  
  return context
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<IItem[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  // first approach - traditional
  // useEffect(() => {
  // setIsFetching(true)
  // fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')
  //   .then(res => {
  //     if(!res.ok) throw Error('Something went wrong!') // in case request executed but data doesn't exist or 404
  //     return res.json()
  //   })
  //   .then(({feedbacks}) => {
  //     setFeedbackItems(feedbacks)
  //   })
  //   .catch(error => setErrorMessage(`Error: ${error.message}`)) // basically catches error if network, not in 2xx code range or JSON parsing error
  //   .finally(() => setIsFetching(false))
  // }, [])
  // / first approach - traditional

  // async/await approach - modern
  useEffect(() => {
    async function fetchFeedbackItems() {
      setIsFetching(true)

      try {
        const res = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        )

        if (!res.ok) throw Error('Something went wrong!')

        const data = await res.json()
        setFeedbackItems(data.feedbacks)
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong!'
        setErrorMessage(`Error: ${errorMessage}`)
      }

      setIsFetching(false)
    }

    fetchFeedbackItems()
  }, [])
  // /async/await approach - modern

  return {
    feedbackItems,
    isFetching,
    errorMessage,
    setFeedbackItems,
  }
}
