import React from 'react'
import Button from './Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Modal = () => {
  const handleCreateTable = () => {

    console.log('modal open')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          color={'green'}
          label="Inspect QR"
          className={''}
          onClick={handleCreateTable}
        ></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              color={'green'}
              label="Cancel"
              className={''}
              // onClick={handleCreateTable}
            ></Button>
          </DialogClose>
          <Button
            color={'green'}
            label="Submit"
            className={''}
            // onClick={handleCreateTable}
          ></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
