import React from "react";
import {
  AlertDialog,
  //AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //AlertDialogTrigger,
} from "../ui/alert-dialog";
import { X } from "lucide-react";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  //onConfirm: () => void;
}

const CustomAlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  //onConfirm,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogCancel className="px-3 py-2 absolute right-3 top-3">
          <X className="h-5 w-6" />
        </AlertDialogCancel>
        <AlertDialogHeader className="">
          <div className="text-center ">
            <AlertDialogTitle className=" text-2xl ">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-xl text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
