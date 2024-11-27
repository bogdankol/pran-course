interface IProps {
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchForm({
  inputValue,
  setInputValue
}: IProps) {
	return (
		<form
			action='#'
			className='search'
		>
			<button type='submit'>
				<i className='fa-solid fa-magnifying-glass'></i>
			</button>

			<input
				spellCheck='false'
				type='text'
				required
				placeholder='Find remote developer jobs...'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInputValue(e.target.value)
				}
				value={inputValue}
			/>
		</form>
	)
}
