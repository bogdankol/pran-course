import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import PetForm from 'components/PetForm'
import { ReactNode } from 'react'

export default function PetButton({
  actionType,
  children,
  onClick
}: {
  actionType: 'add' | 'edit' | 'checkout'
  children?: ReactNode 
  onClick?: () => void
}) {

  if(actionType === 'checkout') 
    return <Button variant={'secondary'} onClick={onClick}>{children}</Button>
  
  return <Dialog>
    <DialogTrigger asChild>
      {actionType === 'add' 
        ? <Button size='icon' onClick={onClick}>
            <PlusIcon className='h-6 w-6'/>
          </Button>
        : <Button variant={'secondary'} onClick={onClick}>{children}</Button>
      }
    </DialogTrigger>
    <DialogContent>
      
      <DialogHeader>
        <DialogTitle>
          {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
        </DialogTitle>

        <PetForm />
      </DialogHeader>
    </DialogContent>
  </Dialog>
}
