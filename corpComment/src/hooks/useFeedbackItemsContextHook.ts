import React, { useContext } from 'react'
import {FeedbackItemsContext} from '../context/FeedbackItemsContext'

export default function useFeedbackItemsContextHook() {

  const context  = useContext(FeedbackItemsContext)
  
  if(!context) throw new Error('FeedbackItemsContext is null')
  
  return context
}
