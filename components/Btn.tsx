import { Box, Button, ButtonProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface PaginationButtonProps {
  children?: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
}

interface CustomButtonProps extends ButtonProps {
  type?: any;
  children?: ReactNode;
  border?: string;
  color?: string;
  pt?: string;
  pb?: string;
  px?: string;
  w?: string | {};
  size?: string;
  weight?: string;
  disabled?: boolean | any;
  bgColor?: string;
  hover?: any;
  // onClick?: () => void |  (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  [key: string]: any;
}

const Btn = ({
  border,
  color,
  type,
  children,
  pt,
  pb,
  px,
  w,
  size,
  weight,
  disabled,
  bgColor,
  hover,
  onClick,
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      type={type || "button"}
      onClick={onClick}
      border={border || "none"}
      pt={pt || "0.5rem"}
      pb={pb || "0.5rem"}
      px={px || "1.5rem"}
      w={w || "auto"}
      color={color || "#fff"}
      fontSize={size || "1rem"}
      fontWeight={weight || 500}
      isDisabled={disabled}
      bgColor={bgColor || "#000"}
      _hover={
        hover
          ? hover
          : {
              bgColor: "none",
              border: "none",
            }
      }
      {...rest}
    >
      {children}
    </Button>
  );
};

export const PaginationButton = ({
  children,
  onClick,
}: PaginationButtonProps) => {
  return (
    <Box
      as="button"
      padding={"6px"}
      borderRadius={"8px"}
      h={"32px"}
      w={"32px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      border={"1px solid #E1E4EA"}
      fontWeight={500}
      fontSize={"14px"}
      color={"#525866"}
      className="inter"
      cursor={"pointer"}
      _hover={{
        bg: "#F5F7FA",
        border: "none",
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
export default Btn;
