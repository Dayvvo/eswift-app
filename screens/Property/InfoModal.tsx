import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Btn from "../../components/Btn";
import { FormEvent, useState } from "react";
import { nigerianStates } from "../../utils/modules";
import { SelectInput, TextInput } from "@/components/Inputs";
import { useInputSettings } from "@/hooks/useInput";

type InformationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ValidationType = {
  [key in keyof {
    state: string;
    property: string;
    location: string;
  }]: (input: string) => boolean;
};

const validation: ValidationType = {
  state: (input: string) => (input ? input.trim().length > 1 : false),
  property: (input: string) => (input ? input.trim().length > 1 : false),
  location: (input: string) => true,
};
const InformationModal = ({ isOpen, onClose }: InformationModalProps) => {
  const [loading, setLoading] = useState();
  const {
    input,
    onChangeHandler,
    inputIsinvalid,
    inputIsvalid,
    onBlurHandler,
  } = useInputSettings(
    {
      state: "",
      property: "",
      location: "",
    },
    validation
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="robotoF">
        <ModalHeader className="robotoF">Property</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submitHandler}>
          <ModalBody pb={6}>
            <Box>
              <SelectInput
                items={nigerianStates}
                label="State"
                placeholder="Select state"
                name="state"
                inputIsinvalid={inputIsinvalid("state")}
                errorMessage="Select state"
                value={input.state}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("state")}
              />
            </Box>
            <Box mt={5}>
              <SelectInput
                items={["Land", "House", "or both"]}
                label="What property are you intrested in buying"
                placeholder="Select property"
                name="property"
                errorMessage="Select property"
                inputIsinvalid={inputIsinvalid("property")}
                value={input.property}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("property")}
              />
            </Box>
            <Box mt={5}>
              <TextInput
                label="Where are you interested in buying property"
                name="location"
                placeholder="Enter location"
                value={input.location}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("location")}
              />
            </Box>
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

export default InformationModal;
