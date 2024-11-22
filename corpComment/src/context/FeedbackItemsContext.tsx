import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { IItem } from '../lib/interfaces'

export const FeedbackItemsContext = createContext<IContext | null>(null)

interface IContext {
  feedbackItems: IItem[]
  filteredFeedbackItems: IItem[]
  isFetching: boolean
  errorMessage: string
  companyList: string[]
  handleAddToList: (text: string) => Promise<void>
  handleSelectCompany: (company: string) => void
}

export default function FeedbackItemsProvider({
  children
}: {
  children: ReactNode
}) {

  const [feedbackItems, setFeedbackItems] = useState<IItem[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<string>()

  const companyList = useMemo(() => feedbackItems
    .map((item: IItem) => item.company)
    .filter((item: string, idx: number, array: string[]) => {
      return array.indexOf(item) === idx
    }),
    [feedbackItems]
  )

  async function handleAddToList(text: string) {
    const hashTag = text.split(' ').find(word => word.includes('#'))?.substring(1)

    if(!hashTag || text.length < 6) throw Error(`Text doesn't contain a hashtag!`)

    const newItem: IItem = {
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: hashTag,
      badgeLetter: hashTag.substring(0, 1).toUpperCase(),
      id: new Date().getTime()
    }

    setFeedbackItems(prev => [...prev, newItem])

    await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

  }

  const filteredFeedbackItems = useMemo(() => selectedCompany
    ? feedbackItems
      .filter((el: IItem) => el.company === selectedCompany)
    : feedbackItems, 
    [selectedCompany, feedbackItems]
  )

  function handleSelectCompany(company: string) {
    if(selectedCompany === company) return setSelectedCompany('')
    setSelectedCompany(company)
  }

  
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
  
  return <FeedbackItemsContext.Provider
    value={{
      feedbackItems,
      filteredFeedbackItems,
      isFetching,
      errorMessage,
      companyList,
      handleAddToList,
      handleSelectCompany
    }}
  >{children}</FeedbackItemsContext.Provider>
}
