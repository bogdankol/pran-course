import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'
import FeedbackForm from '../FeedbackForm'
import Logo from '../Logo'
import PageHeading from '../PageHeading'
import Pattern from '../Pattern'

export default function Header() {

  const {
    handleAddToList
  } = useFeedbackItemsContextHook()
  
  return (
    <header>
      <Pattern />

      <Logo />

      <PageHeading />

      <FeedbackForm 
        {...{
          onAddItemToList: handleAddToList
        }}
      />
    </header>
  )
}
