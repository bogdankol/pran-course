'use client'
import { useState, useEffect, useRef } from 'react'

type IMenuItem = {
  id: number
  name: string
  parentId: null | number
}

const TIMEOUT = 2000

export default function Content() {
  
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

  // function findLongestWord(str: string) {
  //   const arr = str.split(' ').sort((a: string, b: string) => b.length - a.length)[0]
  //   console.log(arr)
  // }

  // findLongestWord("Frontend development is amazing"); 
  // // Output: "development"
  
  const [inputValue, setInputValue] = useState('')
  let timer: NodeJS.Timeout

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      setInputValue(e.target.value)
    }, TIMEOUT)
  }

  useEffect(() => {
    console.log({inputValue})
  }, [inputValue])

  return <div>
    CONTENT

    <input 
      type='text'
      value={inputValue}
      onChange={onChange}
    />
  </div>
}