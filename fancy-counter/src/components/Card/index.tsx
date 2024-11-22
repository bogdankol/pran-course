import { useEffect, useState } from 'react';
import Count from '../Count';
import CountButtonsContainer from '../CountButtonsContainer';
import ResetBtn from '../ResetBtn';
import Title from '../Title';
import CountButton from '../CountButton';

export default function Card() {
  const [count, setCount] = useState<number>(0)
  const locked = count === 5

  useEffect(() => {
    const handleKeydown = (e: { code : string }) => {
      if (e.code === 'Space') {
        setCount((prev: number) => {
          if(prev < 5) return prev + 1
          return prev
        })
      }
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [count])

  return <div className={`card ${locked ? 'card--limit' : ''}`}>

    <Title {...{ locked }}/>

    <Count {...{ count }} />

    <ResetBtn {...{ setCount }} />

    <CountButtonsContainer>
      <CountButton {...{ setCount, type: 'minus', locked }}/>
      
      <CountButton {...{ setCount, type: 'plus', locked }}/>
    </CountButtonsContainer>
    
  </div>
}
