import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
interface PasswordProps {
  onClick: () => void;
  show: boolean;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  isError?: boolean;
  errorMessage?: string;
}
export const PasswordInput = ({
  onClick,
  show,
  label,
  onChange,
  onBlur,
  isError,
  errorMessage,
  name,
  value,
}: PasswordProps) => {
  return (
    <FormControl w={"100%"} mb={4}>
      <FormLabel
        fontWeight={500}
        fontSize={"14px"}
        textColor={"var(--strong950)"}
      >
        {label}
      </FormLabel>
      <InputGroup
        display={"flex"}
        justifyContent={"center"}
        border={"1px"}
        borderRadius={"10px"}
        borderColor={"var(--soft200)"}
        cursor={"text"}
        fontSize={14}
        textColor={"var--(sub600)"}
        w="100%"
        h="40px"
        _placeholder={{ textColor: "var--(soft400)", fontSize: 12 }}
      >
        <InputLeftElement pointerEvents="none" color={"var(--soft400)"}>
          <RiLockPasswordLine className="formicon" />
        </InputLeftElement>
        <Input
          w={"100%"}
          h={"100%"}
          outline={"none"}
          type={show ? "text" : "Password"}
          placeholder="*********"
          // name="password"
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          border={isError ? "1px solid var(--errorBase)" : "1px solid #262626"}
          focusBorderColor={
            isError ? "1px solid var(--errorBase)" : "1px solid #262626"
          }
        />
        <InputRightElement
          width="fit-content"
          marginRight={"20px"}
          cursor={"pointer"}
        >
          <Box onClick={onClick}>
            {!show ? (
              <BsEyeSlash className="formicon" />
            ) : (
              <BsEye className="formicon" />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>

      {isError && (
        <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
