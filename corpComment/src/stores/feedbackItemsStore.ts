import { create } from 'zustand'
import { IItem } from '../lib/interfaces'

interface IFeedbackItemsStore {
  feedbackItems: IItem[]
  filteredFeedbackItems: IItem[]
  isFetching: boolean
  errorMessage: string
  selectedCompany: string
  getCompanyList: () => string[]
  setFilteredItems: () => void
  addItemToList: (text: string) => Promise<void>
  selectCompany: (text: string) => void
  fetchFeedbackItems: () => Promise<void>
}

export const feedbackItemsStore = create<IFeedbackItemsStore>(
  (setFunction: any, getCurrentState: any) => ({
    feedbackItems: [],
    filteredFeedbackItems: [],
    isFetching: false,
    errorMessage: '',
    selectedCompany: '',
    getCompanyList: () => getCurrentState().feedbackItems
      .map((item: IItem) => item.company)
      .filter((item: string, idx: number, array: string[]) => {
        return array.indexOf(item) === idx
      }),
    setFilteredItems: () => {
      setFunction(({ filteredFeedbackItems }: { filteredFeedbackItems: IItem[] }) => {
        const { selectedCompany, feedbackItems } = getCurrentState()

        const newItems = selectedCompany
          ? feedbackItems
            .filter((el: IItem) => el.company === selectedCompany)
          : feedbackItems

        console.log({feedbackItems, selectedCompany, newItems})

        return ({ filteredFeedbackItems: newItems })

      })
    },
    addItemToList: async (text: string) => {
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
  
      setFunction(({ feedbackItems }: { feedbackItems: IItem[]}) => ({ feedbackItems: [...feedbackItems, newItem]}))
  
      await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const { setFilteredItems } = getCurrentState()
      setFilteredItems()
  
    },
    selectCompany: (company: string) => {
      setFunction(({ selectedCompany }: { selectedCompany: string }) => {
        if(selectedCompany === company) return ({ selectedCompany: ''})
        return ({ selectedCompany: company})
      })

      const { setFilteredItems } = getCurrentState()
      setFilteredItems()
    },
    fetchFeedbackItems: async () => {
      setFunction(() => ({
        isFetching: true
      }))

      try {
        const res = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        )

        if (!res.ok) throw Error('Something went wrong!')

        const data = await res.json()
        setFunction(() => ({
          feedbackItems: data.feedbacks
        }))
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong!'
        setFunction(() => ({ errorMessage: `Error: ${errorMessage}` }))
      }

      setFunction(() => ({
        isFetching: false
      }))

      const { setFilteredItems } = getCurrentState()
      setFilteredItems()
    }
}))