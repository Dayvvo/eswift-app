import Btn from "@/components/Btn";
import { WarningIcon } from "@/components/svg";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";

interface VerfyProps {
  toggleModal: () => void;
  verifyPropertyFn: (status: string) => {};
  isVerifying: boolean;
}
interface DeclineProps {
  toggleModal: () => void;
  verifyPropertyFn: (status: string) => {};
  isVerifying: boolean;
}
interface SuspendProps {
  toggleModal: () => void;
  verifyPropertyFn: (status: string) => {};
  isVerifying: boolean;
}
interface DeleteProps {
  toggleModal: () => void;
  deletePropertyFn: () => void;
  isVerifying: boolean;
}
export const VerifyState = ({
  toggleModal,
  verifyPropertyFn,
  isVerifying,
}: VerfyProps) => {
  return (
    <>
      <Box>
        <Box display={"flex"} gap={"16px"} mb={"16px"} padding={"16px"}>
          <WarningIcon />
          <Box>
            <Text
              className="inter"
              color={"#0E121B"}
              fontWeight={500}
              fontSize={"14px"}
            >
              Are you certain you want to proceed with verifying this Property?
            </Text>
            <Text
              className="inter"
              color={"#525866"}
              fontWeight={400}
              fontSize={"13px"}
            >
              Potentially terminate this property.
            </Text>
          </Box>
        </Box>
        <Flex
          justifyContent={"space-between"}
          padding={"16px"}
          borderTop={"1px solid #E1E4EA"}
        >
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Checkbox></Checkbox>
            <Text
              className="inter"
              color={"#0E121B"}
              fontWeight={400}
              fontSize={"13px"}
            >
              Don't show it again
            </Text>
          </Box>
          <Flex gap={"10px"}>
            <Btn
              m="1px"
              bg={"#fff"}
              className="inter"
              textColor={"#525866"}
              fontSize={"14px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              h="36px"
              border={"1px solid #E1E4EA"}
              padding={"8px"}
              borderRadius={"8px"}
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
              onClick={toggleModal}
            >
              Cancel
            </Btn>
            <Btn
              m="1px"
              bg={"#fff"}
              className="inter"
              textColor={"#525866"}
              fontSize={"14px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              h="36px"
              border={"1px solid #E1E4EA"}
              paddingY={"8px"}
              paddingX={"20px"}
              borderRadius={"8px"}
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
              onClick={() => verifyPropertyFn("verified")}
              isLoading={isVerifying}
              loadingText="Verifying"
              disabled={isVerifying}
            >
              Yes, verify
            </Btn>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export const DeclineState = ({
  toggleModal,
  verifyPropertyFn,
  isVerifying,
}: DeclineProps) => {
  return (
    <Box>
      <Box display={"flex"} gap={"16px"} mb={"16px"} padding={"16px"}>
        <WarningIcon />
        <Box>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={500}
            fontSize={"14px"}
          >
            Are you certain you want to proceed with Declining the approval of
            this Property?
          </Text>
          <Text
            className="inter"
            color={"#525866"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Potentially terminate this property.
          </Text>
        </Box>
      </Box>
      <Flex
        justifyContent={"space-between"}
        padding={"16px"}
        borderTop={"1px solid #E1E4EA"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Checkbox></Checkbox>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Don't show it again
          </Text>
        </Box>
        <Flex gap={"10px"}>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            padding={"8px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={toggleModal}
          >
            Cancel
          </Btn>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            paddingY={"8px"}
            paddingX={"20px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={() => verifyPropertyFn("rejected")}
            isLoading={isVerifying}
            loadingText="Submiting"
            disabled={isVerifying}
          >
            Yes, Descline
          </Btn>
        </Flex>
      </Flex>
    </Box>
  );
};
export const SuspendState = ({
  toggleModal,
  isVerifying,
  verifyPropertyFn,
}: SuspendProps) => {
  return (
    <Box>
      <Box display={"flex"} gap={"16px"} mb={"16px"} padding={"16px"}>
        <WarningIcon />
        <Box>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={500}
            fontSize={"14px"}
          >
            Are you certain you want to proceed with the suspension of this
            Property?
          </Text>
          <Text
            className="inter"
            color={"#525866"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Potentially terminate this property.
          </Text>
        </Box>
      </Box>
      <Flex
        justifyContent={"space-between"}
        padding={"16px"}
        borderTop={"1px solid #E1E4EA"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Checkbox></Checkbox>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Don't show it again
          </Text>
        </Box>
        <Flex gap={"10px"}>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            padding={"8px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={toggleModal}
          >
            Cancel
          </Btn>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            paddingY={"8px"}
            paddingX={"20px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={() => verifyPropertyFn("suspend")}
            isLoading={isVerifying}
            loadingText="Submiting"
            disabled={isVerifying}
            // onClick={verifyPropertyFn}
          >
            Yes, Suspend
          </Btn>
        </Flex>
      </Flex>
    </Box>
  );
};
export const DeleteProperty = ({
  toggleModal,
  isVerifying,
  deletePropertyFn,
}: DeleteProps) => {
  return (
    <Box>
      <Box display={"flex"} gap={"16px"} mb={"16px"} padding={"16px"}>
        <WarningIcon />
        <Box>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={500}
            fontSize={"14px"}
          >
            Are you certain you want to proceed with the deletion of this
            Property?
          </Text>
          <Text
            className="inter"
            color={"#525866"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Potentially terminate this property.
          </Text>
        </Box>
      </Box>
      <Flex
        justifyContent={"space-between"}
        padding={"16px"}
        borderTop={"1px solid #E1E4EA"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Checkbox></Checkbox>
          <Text
            className="inter"
            color={"#0E121B"}
            fontWeight={400}
            fontSize={"13px"}
          >
            Don't show it again
          </Text>
        </Box>
        <Flex gap={"10px"}>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            padding={"8px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={toggleModal}
          >
            Cancel
          </Btn>
          <Btn
            m="1px"
            bg={"#fff"}
            className="inter"
            textColor={"#525866"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="36px"
            border={"1px solid #E1E4EA"}
            paddingY={"8px"}
            paddingX={"20px"}
            borderRadius={"8px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            onClick={deletePropertyFn}
            isLoading={isVerifying}
            loadingText="Deleting"
            disabled={isVerifying}
            // onClick={verifyPropertyFn}
          >
            Yes, Delete
          </Btn>
        </Flex>
      </Flex>
    </Box>
  );
};
