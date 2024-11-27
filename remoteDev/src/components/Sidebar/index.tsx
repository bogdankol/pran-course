import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Sidebar({
  children
}: IProps) {
	return (
		<div className='sidebar'>
			{children}
		</div>
	)
}

export function SidebarTop({
  children
}: IProps) {
  return <div className='sidebar__top'>
    {children}
  </div>
}