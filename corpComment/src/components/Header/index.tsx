// import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'
import FeedbackForm from '../FeedbackForm'
import Logo from '../Logo'
import PageHeading from '../PageHeading'
import Pattern from '../Pattern'
import { feedbackItemsStore } from '../../stores/feedbackItemsStore'

export default function Header() {

  // const {
  //   handleAddToList
  // } = useFeedbackItemsContextHook()

  const addItemToList = feedbackItemsStore(state => state.addItemToList)
  
  return (
    <header>
      <Pattern />

      <Logo />

      <PageHeading />

      <FeedbackForm 
        {...{
          onAddItemToList: addItemToList
        }}
      />
    </header>
  )
}
