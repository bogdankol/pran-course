import FeedbackItem from '../FeedbackItem'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import { IItem } from '../../lib/interfaces'
// import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'
import { feedbackItemsStore } from '../../stores/feedbackItemsStore'

export default function FeedbackList() {

  // const {
  //   errorMessage,
  //   filteredFeedbackItems,
  //   isFetching
  // } = useFeedbackItemsContextHook()

  const errorMessage = feedbackItemsStore(state => state.errorMessage)
  const filteredFeedbackItems = feedbackItemsStore(state => state.filteredFeedbackItems)
  const isFetching = feedbackItemsStore(state => state.isFetching)

  return (
    <ol className="feedback-list">
      {isFetching 
        ? <Spinner /> 
        : errorMessage 
          ? <ErrorMessage
            {...{
              message: errorMessage,
            }}
          />
          // : filteredFeedbackItems?.map((el: IItem) => <FeedbackItem {...el} key={el.id} />)
          : filteredFeedbackItems?.map((el: IItem) => <FeedbackItem {...el} key={el.id} />)
      }
    </ol>
  )
}
