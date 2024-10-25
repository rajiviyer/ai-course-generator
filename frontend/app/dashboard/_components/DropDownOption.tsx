import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

  
  import { HiOutlineTrash } from "react-icons/hi2";
  

export default function DropDownOption({children, handleOnDelete}: {children: React.ReactNode, handleOnDelete: () => void}) {

    const [ openAlert, setOpenAlert ] = useState(false);

  return (
    <div>
      <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuItem onClick={()=>setOpenAlert(true)}>
              <div className="flex gap-1 items-center"><HiOutlineTrash /> Delete</div>
          </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your course
              and remove your data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{handleOnDelete(); setOpenAlert(false)}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
