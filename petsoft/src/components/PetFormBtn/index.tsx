import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function PetFormBtn({
  actionType,
}: {
  actionType: 'add' | 'edit'
}) {
  const status = useFormStatus()

  return (
    <Button type="submit" className="mt-5 self-end" disabled={status.pending}>
      {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
    </Button>
  )
}
