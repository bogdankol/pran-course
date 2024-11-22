import { useEffect, useState } from 'react'
import Stats from '../Stats'
import Textarea from '../Textarea'
import {
	INSTAGRAM_MAX_CHARACTERS,
	FACEBOOK_MAX_CHARACTERS,
} from '../../lib/constants'

const useCustomHook = () => {
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      setQuantity(data)
    }

    fetchProducts()
  }, [])

  return quantity
}

export default function Container() {
	const [text, setText] = useState('')
  const quantity = useCustomHook()
  console.log({quantity})
	const stats = {
		numberOfCharacters: text.length,
		instagramCharactersLeft: INSTAGRAM_MAX_CHARACTERS - text.length,
		facebookCharactersLeft: FACEBOOK_MAX_CHARACTERS - text.length,
		numberOfWords: text.split(/\s/).filter((el: string) => el).length,
	}

	return (
		<main className='container'>
			<Textarea
				{...{
					text,
					setText,
				}}
			/>

			<Stats
				{...{
					stats,
				}}
			/>
		</main>
	)
}
