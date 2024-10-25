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
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function LoadingDialog({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <VisuallyHidden.Root>
            <AlertDialogTitle>Generating Course</AlertDialogTitle>
          </VisuallyHidden.Root>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-10">
              <Image src="/loader.gif" width={100} height={100} alt="" />
              <h2>Please wait.. Your course is being created</h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
