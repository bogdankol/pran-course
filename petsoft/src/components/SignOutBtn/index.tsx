'use client'

import { Button } from '@/components/ui/button'
import { signOutFunc } from '@/serverActions/actions' 

export default function SignOutBtn() {
  return <Button onClick={async () => await signOutFunc()}>Sign out</Button>
}
