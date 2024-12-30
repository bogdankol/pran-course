'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from 'lib/utils'

const routes = [
  {
    name: 'Home',
    path: '/'
  }, {
    name: 'All Events',
    path: '/events/all'
  }
]

export default function Header() {

  const pathname = usePathname()

	return (
		<header className='flex justify-between items-center border-b border-white/10 h-14 px-3 md:px-9'>
			<Logo />

      <nav className='h-full'>
        <ul className='flex gap-x-6 text-sm h-full'>
          {routes.map((route: { name: string, path: string }) => <li 
            key={route.path}
            className={cn(
              ' hover:text-white transition relative flex items-center', {
                'text-white': pathname === route.path,
                'text-white/50': pathname !== route.path
              }
            )}
          >
            <Link href={route.path}>{route.name}</Link>

            {pathname === route.path && 
              // layoutId - for framer-motion to know that these divs are the same and difference between them
              //   should be animated
              <motion.div layoutId='nav-link' className='bg-accent h-1 w-full absolute bottom-0'></motion.div>
            }
          </li>)}
        </ul>
      </nav>
		</header>
	)
}
