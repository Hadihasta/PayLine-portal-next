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
import Image from 'next/image'


interface ModalProps {
   data: {
    id: string
    qr_code: string
    table_number: string
    store_id: string
  }
}

const Modal = (props: ModalProps) => {
  const { qr_code , table_number} = props.data

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
          <DialogTitle className="border-b pb-4">{`QR TABLE NUMBER ${table_number}`}</DialogTitle>
          <DialogDescription className="flex justify-center mt-3">
            Save To Your Computer or Print Manualy QR
          </DialogDescription>
 
          <div className="flex justify-center w-full h-100  relative rounded-sm border-4 border-greenPrimary ">
            {qr_code ? 
            
              <Image
              src={qr_code ? qr_code : ''}
              alt="Qr Image"
              fill
            /> : 
            <>
              <div className='flex justify-center items-center text-gray-500'>Sory QR not Found Contact Administrator </div>
            </>
          }
          </div>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              color={'green'}
              label="Save"
              className={''}
              // onClick={handleCreateTable}
            ></Button>
          </DialogClose>
          <Button
            color={'green'}
            label="Print"
            className={''}
            // onClick={handleCreateTable}
          ></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
