import { createContext, ReactNode, useMemo, useState } from 'react'
import { IItem } from '../lib/interfaces'
import { useFeedbackItems } from '../hooks/useFeedbackItemsContextHook'

export const FeedbackItemsContext = createContext<IContext | null>(null)

interface IContext {
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
  // const [selectedCompany, setSelectedCompany] = useState<string>()

  // const {
  //   feedbackItems,
  //   isFetching,
  //   errorMessage,
  //   setFeedbackItems,
  // } = useFeedbackItems()

  // const companyList = useMemo(() => feedbackItems
  //   .map((item: IItem) => item.company)
  //   .filter((item: string, idx: number, array: string[]) => {
  //     return array.indexOf(item) === idx
  //   }),
  //   [feedbackItems]
  // )

  // async function handleAddToList(text: string) {
  //   const hashTag = text.split(' ').find(word => word.includes('#'))?.substring(1)

  //   if(!hashTag || text.length < 6) throw Error(`Text doesn't contain a hashtag!`)

  //   const newItem: IItem = {
  //     text,
  //     upvoteCount: 0,
  //     daysAgo: 0,
  //     company: hashTag,
  //     badgeLetter: hashTag.substring(0, 1).toUpperCase(),
  //     id: new Date().getTime()
  //   }

  //   setFeedbackItems(prev => [...prev, newItem])

  //   await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
  //     method: 'POST',
  //     body: JSON.stringify(newItem),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   })

  // }

  // const filteredFeedbackItems = useMemo(() => selectedCompany
  //   ? feedbackItems
  //     .filter((el: IItem) => el.company === selectedCompany)
  //   : feedbackItems, 
  //   [selectedCompany, feedbackItems]
  // )

  // function handleSelectCompany(company: string) {
  //   if(selectedCompany === company) return setSelectedCompany('')
  //   setSelectedCompany(company)
  // }

  return 
  // <FeedbackItemsContext.Provider
  //   value={{
  //     filteredFeedbackItems,
  //     isFetching,
  //     errorMessage,
  //     companyList,
  //     handleAddToList,
  //     handleSelectCompany
  //   }}
  // >{children}</FeedbackItemsContext.Provider>
}
