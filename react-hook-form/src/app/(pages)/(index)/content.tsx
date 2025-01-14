'use client'
import { FieldValues, useForm } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { z } from 'zod'
import Button from './Button'

type IMenuItem = {
	id: number
	name: string
	parentId: null | number
}

const timer: NodeJS.Timeout | null = null


export default function Content() {
	// --------------------------------------------------------
	// const menu = [
	//   { id: 1, name: "Home", parentId: null },
	//   { id: 2, name: "About", parentId: null },
	//   { id: 3, name: "Team", parentId: 2 },
	//   { id: 4, name: "Services", parentId: null },
	//   { id: 5, name: "Consulting", parentId: 4 },
	//   { id: 6, name: "Something Else", parentId: 4 },
	// ]

	// function transformIntoTree(arr: IMenuItem[]) {
	//   const parentlessItems = arr.filter((el: IMenuItem) => !el.parentId)

	//   const resultArr = parentlessItems.map((parentItem: IMenuItem) => ({
	//     id: parentItem.id,
	//     name: parentItem.name,
	//     children: arr.filter(el => el.parentId === parentItem.id)
	//   }))

	//   return resultArr
	// }

	// console.log(transformIntoTree(menu))

	// --------------------------------------------------------
	// function findLongestWord(str: string) {
	//   const arr = str.split(' ').sort((a: string, b: string) => b.length - a.length)[0]
	//   console.log(arr)
	// }

	// findLongestWord("Frontend development is amazing");
	// // Output: "development"

	// --------------------------------------------------------
	// const [inputValue, setInputValue] = useState('')

	// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   const value = e.target.value

	//   if(timer) clearTimeout(timer)

	//   timer = setTimeout(() => {
	//     setInputValue(value)
	//   }, 2000)
	// }

	// useEffect(() => {
	//   console.log({inputValue})
	// }, [inputValue])

	// --------------------------------------------------------
	// const nestedArray = [1, [2, [3, [4]], 5]];
	// flattenArray(nestedArray);
	// // Output: [1, 2, 3, 4, 5]

	// function flattenArray(arr: unknown[]) {

	//   const str = JSON.stringify(arr)
	//   const deepnessOfFlat = str.split(']').length

	//   const flattedArr = arr.flat(deepnessOfFlat)
	//   console.log(flattedArr)
	// }

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm()

  async function onSubmit(data: FieldValues) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // const [i ,setI] = useState(1)
  // let w = 1

  // useEffect(() => {
  //   setTimeout(() => setI(1000), 2000)
  // }, [])

  // useEffect(() => {
  //   console.log({i})
  // }, [i])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-y-2'
		>

      {/* <button type={'button'} onClick={() => {
        // setI(i+1)
        console.log(w)
        w += 1
        }}>+1</button>
      <Button {...{
        i: i
      }}/> */}

			{/* <input 
        type='text'
        className='px-4 py-2 rounded placeholder-gray-500 text-gray-400'
        placeholder='text'
        onChange={onChange}
        // value={inputValue} -- this will hardcode the value of that field and we need it dynamic so we don't need it here
      /> */}

			<input
        {
          ...register('email', {
            required: 'Email is required!',
          })
        }
				type='email'
				className='px-4 py-2 rounded'
				placeholder='Email'
			/>

      {
        errors.email && (
          <p className='text-red-500'>{`${errors.email.message}`}</p>
        )
      }

			<input
        {
          ...register('password', {
            required: 'Password is required!',
            minLength: {
              value: 10,
              message: 'Password must contain at least 10 characters'
            }
          })
        }
				type='password'
				className='px-4 py-2 rounded'
				placeholder='Password'
			/>

      {
        errors.password && (
          <p className='text-red-500'>{`${errors.password.message}`}</p>
        )
      }

			<input
        {
          ...register('confirmPassword', {
            required: 'confirmPassword is required!',
            validate: value => value === getValues('password') || 'Passwords must match!'
          })
        }
				type='password'
				placeholder='Confirm password'
				className='px-4 py-2 rounded'
			/>

      {
        errors.confirmPassword && (
          <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
        )
      }

			<button
				type='submit'
				className='bg-blue-500 disabled:bg-gray-500 py-2 rounded'
        disabled={isSubmitting}
			>
				Submit
			</button>
		</form>
	)
}
