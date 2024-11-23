// import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'
import HashtagItem from '../HashtagItem'
import { feedbackItemsStore } from '../../stores/feedbackItemsStore'

export default function HashtagList() {

  // const {
  //   companyList,
  //   handleSelectCompany
  // } = useFeedbackItemsContextHook()

  const feedbackItems = feedbackItemsStore(state => state.feedbackItems)
  const getCompanyList = feedbackItemsStore(state => state.getCompanyList)
  const selectCompany = feedbackItemsStore(state => state.selectCompany)
  
  if(feedbackItems.length === 0) return 

  return (
    <ul className='hashtags'>
      {getCompanyList()?.map((el: string) => <HashtagItem 
        {...{
          el,
          onSelectCompany: selectCompany
        }}
        key={el}
      />)}
    </ul>
  )
}
