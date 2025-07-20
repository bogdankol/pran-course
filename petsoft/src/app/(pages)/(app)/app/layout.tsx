import AppFooter from 'components/AppFooter'
import AppHeader from 'components/AppHeader'
import BackgroundPattern from 'components/BackgroundPattern'
import PetContextProvider from '@/contexts/pet-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import { TPet } from '@/lib/types'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const res = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  )

  if (!res.ok) {
    throw new Error('Pets are not fetched')
  }

  const data = (await res.json()) as TPet[]
  return (
    <>
      <BackgroundPattern />

      <div className={`max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen`}>
        <AppHeader />

        <PetContextProvider data={data}>
          <SearchContextProvider>
            {children}
          </SearchContextProvider>
        </PetContextProvider>

        <AppFooter />
      </div>
    </>
  )
}
