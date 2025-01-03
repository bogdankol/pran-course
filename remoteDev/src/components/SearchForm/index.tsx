import { useSearchTextContext } from '../../hooks/useSearchTextContext'

export default function SearchForm() {

  const {
    debouncedInputValue,
    handleChangeSearchText
  } = useSearchTextContext()
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
					handleChangeSearchText(e.target.value)
				}
				value={debouncedInputValue}
			/>
		</form>
	)
}
