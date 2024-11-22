import FeedbackItem from '../FeedbackItem'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import { IItem } from '../../lib/interfaces'
import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'

export default function FeedbackList() {

  const {
    errorMessage,
    feedbackItems,
    isFetching
  } = useFeedbackItemsContextHook()

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
          : feedbackItems?.map((el: IItem) => <FeedbackItem {...el} key={el.id} />)
      }
    </ol>
  )
}
