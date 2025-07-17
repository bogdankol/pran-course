import React from 'react'

export default function button({i}: {i?: number}) {
  console.log('I am rerendered!')
  return (
    <p>{i || 123321}</p>
  )
}
