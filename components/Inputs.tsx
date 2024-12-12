import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEventHandler, ReactNode } from "react";
import { Children } from "react";

type SelectInputProps = {
  items: string[];
  label: string;
  placeholder: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: any;
  value?: string | string[];
  inputIsinvalid?: boolean;
  errorMessage?: string;
  border?: any;
  multiple?: boolean;
  rest?: {};
};

type CheckboxInputProps = {
  label: string;
};

type TextInputProps = {
  label: string;
  placeholder: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: any;
  value?: string | string[];
  inputIsinvalid?: any;
  errorMessage?: string;
  keyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void | null;
};

export const SelectInput = ({
  items,
  label,
  placeholder,
  name,
  value,
  onBlur,
  onChange,
  inputIsinvalid,
  errorMessage,
  border,
  ...rest
}: SelectInputProps) => {
  return (
    <FormControl w={"100%"} display={"flex"} flexDir={"column"} gap={"1px"}>
      <FormLabel
        fontWeight={500}
        fontSize={"14px"}
        textColor={"var(--strong950)"}
      >
        {label}
      </FormLabel>
      <Select
        w="100%"
        h="40px"
        border={
          border
            ? border
            : inputIsinvalid
            ? "1px solid var(--errorBase)"
            : "1px solid var(--soft200)"
        }
        borderRadius={"10px"}
        name={name}
        fontSize={14}
        textColor={"var--(sub600)"}
        _placeholder={{ textColor: "var--(soft400)" }}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {items.map((entry) => (
          <option value={`${entry}`} key={entry}>
            {entry}
          </option>
        ))}
      </Select>
      {inputIsinvalid && (
        <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const TextInput = ({
  label,
  placeholder,
  name,
  onChange,
  onBlur,
  value,
  inputIsinvalid,
  errorMessage,
  keyPress,
}: TextInputProps) => {
  return (
    <FormControl display={"flex"} flexDir={"column"} w={{ base: "100%" }}>
      <FormLabel
        fontWeight={500}
        fontSize={"14px"}
        textColor={"var(--strong950)"}
      >
        {label}
      </FormLabel>
      <Input
        w={"100%"}
        h={"40px"}
        // border={
        //   invalidLastName ? "1px solid var(--errorBase)" : "1px solid #262626"
        // }
        borderRadius={"6px"}
        // variant={"unstyled"}
        px={"0.7rem"}
        textColor={"#666"}
        fontWeight={500}
        fontSize={{ base: "12px", lg: "14px" }}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={keyPress}
      />

      {inputIsinvalid && (
        <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const CheckboxInput = ({ label }: CheckboxInputProps) => {
  return (
    <Box
      border={"1px solid #E1E4EA"}
      padding={"10px 10px 10px 12px"}
      width={"100%"}
      h={"40px"}
      display={"flex"}
      justifyContent={"space-between"}
      borderRadius={"10px"}
    >
      <Text
        className="inter"
        fontWeight={500}
        fontSize={"12px"}
        color={"#0E121B"}
      >
        {label}
      </Text>
      <Checkbox />
    </Box>
  );
};
