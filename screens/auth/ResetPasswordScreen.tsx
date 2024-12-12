import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import { MdOutlineEmail } from "react-icons/md";
import React, { FormEvent, useState } from "react";
import Btn from "@/components/Btn";
import Link from "next/link";
import { AuthBackground } from "./authBackground";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { PasswordInput } from "@/components/PasswordInput";
import { useInputSettings } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
type ValidationType = {
  email: (input: string, allInputs?: UserData) => boolean;
  old_password: (input: string, allInputs?: UserData) => boolean;
  new_password: (input: string, allInputs?: UserData) => boolean;
  confirm_new_password: (input: string, allInputs?: UserData) => boolean;
};
const validation: ValidationType = {
  email: (input: string) => (input ? /\S+@\S+\.\S+/.test(input) : false),
  old_password: (input: string) => (input ? input.trim().length > 7 : false),
  new_password: (input: string) => (input ? input.trim().length > 7 : false),
  confirm_new_password: (input: string, allInputs) =>
    allInputs ? input === allInputs.new_password : false,
};
export const ResetPasswordScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  } = useInputSettings(
    { email: "", old_password: "", new_password: "", confirm_new_password: "" },
    validation
  );
  const { reset, logout } = useAuth();

  const resetPasswordFn = async () => {
    // event.preventDefault();
    console.log("you sure");
    setLoading(true);
    try {
      const resp = await reset(input);
      if (resp.status === 200) {
        router.push("/admin");
        logout();
        console.log(resp);
        toast({
          status: "success",
          description: `${resp.data.message}`,
          title: "Failed",
          position: "top",
          duration: 1000,
        });
        setLoading(false);
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
    <form>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="robotoF">
          <ModalHeader className="robotoF">Reset password</ModalHeader>
          <ModalCloseButton />
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
              onClick={resetPasswordFn}
              bg={"transparent"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px solid var(--primaryBase)"}
              borderRadius={"10px"}
              textColor={"var(--primaryBase)"}
              my={"24px"}
              // type="submit"
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
        </ModalContent>
      </Modal>
      <Box
        display={"flex"}
        flexDir={"column"}
        bg={"#FFF"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"100vh"}
        px={{ base: "16px", lg: "44px" }}
        py={"24px"}
        className="robotoF"
      >
        <AuthBackground />
        <Box h={"fit-content"}>
          <Image width={200} height={100} src={"/logo.svg"} alt={"e-Swift"} />
        </Box>
        <Flex flexBasis={1} justifyContent={"center"} alignItems={"center"}>
          <Box
            w={{ base: "100%", sm: "440px" }}
            h={"fit-content"}
            p={{ base: "16px", md: "32px" }}
            border={"1px solid var(--soft200)"}
            boxShadow={"lg"}
            borderRadius={"20px"}
          >
            <AuthHeaderProps
              icon="/registerIcon.png"
              title="Reset Password"
              description="Enter your email to reset your password."
            />
            <Box w={"100%"} border={"1px solid var(--soft200)"} my={"24px"} />
            <Flex flexDir={"column"} w={"100%"} gap={"12px"}>
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Email address{" "}
                  <Text as="span" textColor={"var(--primaryBase)"}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup
                  border={"1px"}
                  borderRadius={"10px"}
                  borderColor={"var(--soft200)"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{ textColor: "var--(soft400)" }}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color={"var(--soft400)"}
                  >
                    <MdOutlineEmail className="formicon" />
                  </InputLeftElement>
                  <Input
                    w={"100%"}
                    h={"100%"}
                    type="email"
                    name="email"
                    placeholder="hello@gmail.com"
                    border={
                      inputIsinvalid("email")
                        ? "1px solid var(--errorBase)"
                        : "1px solid #262626"
                    }
                    focusBorderColor={
                      inputIsinvalid("email")
                        ? "1px solid var(--errorBase)"
                        : "1px solid #262626"
                    }
                    value={input.email}
                    onBlur={() => onBlurHandler("email")}
                    onChange={onChangeHandler}
                  />
                </InputGroup>
                {inputIsinvalid("email") && (
                  <FormHelperText color="var(--errorBase)" fontSize="12px">
                    Enter a valid email
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>
            <Btn
              bg={"var(--primaryBase)"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px"}
              borderColor={"#FFFFFF"}
              borderRadius={"10px"}
              textColor={"#FFFFFF"}
              my={"24px"}
              onClick={() => {
                if (!inputIsvalid("email")) {
                  toast({
                    status: "error",
                    description: "Email is not valid",
                    title: "Failed",
                    position: "top",
                    duration: 1000,
                  });
                  onBlurHandler("email");
                  return;
                }
                onOpen();
              }}
            >
              Reset Password
              {/* <Link href={"/verify-password"}>Reset Password</Link> */}
            </Btn>
            <Flex w="100%" justifyContent={"center"}>
              <Link href={"/admin"}>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--sub600)"}
                  textDecor={"underline"}
                >
                  Back to Login
                </Text>
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
          © {new Date().getFullYear()} e-Swift Property Mart
        </Text>
      </Box>
    </form>
  );
};
