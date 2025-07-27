'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { usePetContext } from '@/hooks/hooks'
// import { TPet } from '@/lib/types'
import { Pet as TPet } from '@prisma/client'
import PetFormBtn from 'components/PetFormBtn'

export default function PetForm({
  actionType,
  onFormSubmission,
}: {
  actionType: 'add' | 'edit'
  onFormSubmission: () => void
}) {
  const { handleAddPet, selectedPetData, handleEditPet } = usePetContext()

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   const formData = new FormData(e.currentTarget)
  //   const pet = Object.fromEntries(formData.entries())

  //   const newPetData = {
  //     id: actionType === 'add' ? String(Date.now()) : selectedPetData?.id,
  //     ...pet,
  //     age: Number(pet.age),
  //     imageUrl:
  //       pet.imageUrl ||
  //       'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
  //   } as TPet

  //   if(actionType === 'add') {
  //     handleAddPet(newPetData)
  //   } else if (selectedPetData && actionType === 'edit') {
  //     handleEditPet(selectedPetData.id, newPetData)
  //   } else return

  //   onFormSubmission()
  // }

  return (
    <form
      className="flex flex-col "
      // onSubmit={handleSubmit}
      action={async (formData) => {
        onFormSubmission()

        const newPet = Object.fromEntries(formData.entries())
        const newPetData: TPet = {
          id: selectedPetData?.id || String(Date.now()),
          ...newPet,
          age: Number(newPet.age),
          imageUrl:
            newPet.imageUrl ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        } as TPet

        if (actionType === 'add') {
          await handleAddPet(newPetData)
        } else if (selectedPetData) {
          await handleEditPet(selectedPetData.id, newPetData)
        }

        // onFormSubmission() // that works without useOptimistic hook, only server actions of useContext
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === 'edit' ? selectedPetData?.name : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={
              actionType === 'edit' ? selectedPetData?.ownerName : ''
            }
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={
              actionType === 'edit' ? selectedPetData?.imageUrl : ''
            }
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === 'edit' ? selectedPetData?.age : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === 'edit' ? selectedPetData?.notes : ''}
          />
        </div>
      </div>

      <PetFormBtn
        {...{
          actionType,
        }}
      />
    </form>
  )
}
