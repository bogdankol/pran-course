import AppFooter from 'components/AppFooter'
import AppHeader from 'components/AppHeader'
import BackgroundPattern from 'components/BackgroundPattern'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>

      <BackgroundPattern />

      <div className={`max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen`}>

        <AppHeader />

        {children}

        <AppFooter />
        
      </div>

    </>
  )
}
