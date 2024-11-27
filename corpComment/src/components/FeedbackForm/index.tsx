import { useState } from 'react'
import { MAX_CHARS } from '../../lib/constants'
import { clsx } from 'clsx'

interface IProps {
  onAddItemToList: (text: string) => void
}

export default function FeedbackForm({
  onAddItemToList
}: IProps) {

  const [text, setText] = useState('')
  const [showValidIndicator, setShowValidIndicator] = useState(false)
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false)

  const charCount = MAX_CHARS - text.length

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value

    if(newText.length > MAX_CHARS) return

    setText(newText)
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const hashTag = text.split(' ').find(word => word.includes('#'))?.substring(1)

    if(!hashTag || text.length < 6) {
      setShowInvalidIndicator(true)
      return setValidationIndicatorsToInitialValue()
    }

    setShowValidIndicator(true)
    onAddItemToList(text)
    setValidationIndicatorsToInitialValue()
  }

  function setValidationIndicatorsToInitialValue() {
    return setTimeout(() => {
      setShowValidIndicator(false)
      setShowInvalidIndicator(false)
    }, 2000)
  }

	return (
		<form 
      className={clsx(
        'form', {
          ['form--valid']: showValidIndicator,
          ['form--invalid']: showInvalidIndicator
        }
      )}
      onSubmit={onSubmitHandler}
      >
			<textarea
				id='feedback-textarea'
				placeholder=''
				spellCheck={false}
        value={text}
        onChange={handleChange}
			/>

			<label htmlFor='feedback-textarea'>
				Enter your feedback here, remember to #hashtag the company
			</label>

			<div>
				<p className='u-italic'>{charCount}</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	)
}
