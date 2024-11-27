import { clsx } from 'clsx'

export default function Button({ 
  buttonType = 'primary', 
  children,
  onClick 
}: { 
  buttonType?: 'primary' | 'secondary', 
  children: string 
  onClick: any
}) {
  return (
    <button 
      className={clsx(
        'btn', {
          'btn--secondary': buttonType === 'secondary'
        }
      )}
      onClick={onClick}
    >{children}</button>
  )
}
