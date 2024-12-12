import type { ToastProps } from "@chakra-ui/react";
import { useToast as useChakraToast } from "@chakra-ui/react";

const useToast = () => {
  const toastOpen = useChakraToast();

  const toast = (props: ToastProps) => {
    const { status, description, title, position, duration } = props;

    const titleValue =
      title ||
      (status === "success" ? "Success" : status === "error" ? "Error" : "");

    toastOpen({
      position: position || "top-right",
      duration: duration || 5000,
      title: titleValue,
      description,
      status,
      isClosable: true,
    });
  };

  return {
    toast,
  };
};

export default useToast;
