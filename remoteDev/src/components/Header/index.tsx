import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Header({
  children
}: IProps) {

	return (
		<header className='header'>
      {children}
		</header>
	)
}

export function HeaderTop({ children }: IProps) {
  return <div className='header__top'>{children}</div>
}