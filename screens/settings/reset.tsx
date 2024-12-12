import Btn from "@/components/Btn";
import { PasswordInput } from "@/components/PasswordInput";
import useAuth from "@/hooks/useAuth";
import { useInputSettings } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface UserData {
  email: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
type ValidationType = {
  //   email: (input: string, allInputs?: UserData) => boolean;
  old_password: (input: string, allInputs?: UserData) => boolean;
  new_password: (input: string, allInputs?: UserData) => boolean;
  confirm_new_password: (input: string, allInputs?: UserData) => boolean;
};
const validation: ValidationType = {
  //   email: (input: string) => (input ? /\S+@\S+\.\S+/.test(input) : false),
  old_password: (input: string) => (input ? input.trim().length > 7 : false),
  new_password: (input: string) => (input ? input.trim().length > 7 : false),
  confirm_new_password: (input: string, allInputs) =>
    allInputs ? input === allInputs.new_password : false,
};
type ResetPasswordProps = {
  isOpen: boolean;
  email: string;
  onClose: () => void;
};

const ResetPasswordModal = ({ isOpen, onClose, email }: ResetPasswordProps) => {
  const [show, setShow] = useState({
    old_password: false,
    new_password: false,
    confirm_new_password: false,
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    input,
    inputIsvalid,
    inputIsinvalid,
    onBlurHandler,
    onChangeHandler,
    reset: resetInput,
  } = useInputSettings(
    {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validation
  );
  const { reset, logout } = useAuth();

  const resetPasswordFn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resp = await reset({ ...input, email: email });
      if (resp.status === 200) {
        onClose();
        toast({
          status: "success",
          description: `${resp.data.message}`,
          title: "Failed",
          position: "top",
          duration: 1000,
        });
        setLoading(false);
        input.confirm_new_password = "";
        input.old_password = "";
        input.new_password = "";
        resetInput();
      }
    } catch (error: any) {
      toast({
        status: "error",
        description: `${error?.response?.data.message}`,
        title: "Failed",
        position: "top",
        duration: 1000,
      });
      setLoading(false);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="robotoF">
        <ModalHeader className="robotoF">Reset password</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={resetPasswordFn}>
          <ModalBody pb={6}>
            <PasswordInput
              label="Old password"
              name="old_password"
              show={show.old_password}
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  old_password: !prev.old_password,
                }))
              }
              value={input.old_password}
              onBlur={() => onBlurHandler("old_password")}
              onChange={onChangeHandler}
              isError={inputIsinvalid("old_password")}
              errorMessage="minimum of 8 characters*"
            />
            <PasswordInput
              label="New password"
              name="new_password"
              show={show.new_password}
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  new_password: !prev.new_password,
                }))
              }
              value={input.new_password}
              onBlur={() => onBlurHandler("new_password")}
              onChange={onChangeHandler}
              isError={inputIsinvalid("new_password")}
              errorMessage="minimum of 8 characters*"
            />
            <PasswordInput
              label="Confirm password"
              name="confirm_new_password"
              show={show.confirm_new_password}
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  confirm_new_password: !prev.confirm_new_password,
                }))
              }
              value={input.confirm_new_password}
              onBlur={() => onBlurHandler("confirm_new_password")}
              onChange={onChangeHandler}
              isError={input.confirm_new_password !== input.new_password}
              errorMessage="Confirm password must match new password*"
            />
          </ModalBody>
          <ModalFooter>
            <Btn
              bg={"transparent"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px solid var(--primaryBase)"}
              borderRadius={"10px"}
              textColor={"var(--primaryBase)"}
              my={"24px"}
              type="submit"
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
              isLoading={loading}
              // loadingText="submitting"
              disabled={loading}
            >
              submit
            </Btn>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
