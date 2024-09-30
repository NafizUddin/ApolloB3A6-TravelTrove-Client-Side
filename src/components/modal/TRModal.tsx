import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  title: string;
  children: ReactNode;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  onAction?: (onClose: () => void) => void;
  isSubmitting?: boolean;
}

export default function TRModal({
  buttonText,
  title,
  children,
  buttonVariant = "light",
  buttonClassName,
  size = "3xl",
  onAction,
  isSubmitting = false,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={buttonClassName}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        size={size}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 lg:text-3xl">
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <div className="w-full">
                  <Button
                    type="submit"
                    color="primary"
                    onPress={() => {
                      if (onAction) onAction(onClose); // Trigger form submission and close modal if valid
                    }}
                    className="w-full text-white"
                    isLoading={isSubmitting}
                  >
                    Action
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
