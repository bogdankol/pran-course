import { useState } from 'react'
import Warning from '../Warning'

export default function Textarea({
	text,
	setText,
}: {
	text: string
	setText: React.Dispatch<React.SetStateAction<string>>
}) {
	const [warningText, setWarningText] = useState('')

	function onChangeHandler(e: { target: { value: string } }) {
		let newText = e.target.value
		if (newText.includes('<script>')) {
			newText = newText.replace('<script>', '')
			setWarningText(`No script tag allowed!`)
		} else if (newText.includes('@')) {
			newText = newText.replace('@', '')
			setWarningText(`No @ symbol allowed!`)
		} else {
			setWarningText(``)
		}
		setText(newText)
	}

	return (
		<div className='textarea'>
			<textarea
				value={text}
				onChange={onChangeHandler}
				placeholder='enter your text here'
				spellCheck='false'
			/>

			<Warning {...{ warningText }} />
		</div>
	)
}
