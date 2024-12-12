import Btn from "@/components/Btn";
import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { FaCheck, FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa6";
import { Documents } from ".";
import { DocumentTypes } from "@/utils/types";
import useToast from "@/hooks/useToast";

interface ButtonFunction {
  next: () => void;
  previous: () => void;
  onChangeFileName: (name: string, value: File | null) => void;
  documents: Documents;
  loading: boolean;
}

const FileInputComponent = ({
  title,
  name,
  onChange,
  uploaded,
}: {
  title: string;
  name: string;
  onChange: (name: string, value: File | null) => void;
  uploaded: File | { type: string, document: string, _id?: string };
}) => {
  const toast = useToast();
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    let fileList = e.target.files;

    let file: File | null = null;

    const isValidFile = (file: File) => {
      let validationErr = "";
      console.log("file type", file.type);
      if (file.type !== "application/pdf") {
        validationErr = "Invalid File type";
      } else if (file.size / (1024 * 1024) > 6) {
        validationErr = "File is too large";
      }

      validationErr &&
        toast.toast({
          status: "error",
          title: "Error uploading file",
          description: validationErr,
        });

      return validationErr;
    };

    if (fileList?.length) {
      file = fileList[0] as File;
      !isValidFile(file) && onChange(name, file);
    }
  };

  return (
    <Box>
      <Box bg="#F5F7FA" color={"#99A0AE"} fontSize={"14px"} p=" 0.3em 1em">
        {" "}
        {title.toUpperCase()}{" "}
      </Box>

      {!uploaded ? (
        <Flex
          mt="1em"
          p="0.5em 1em"
          alignItems={"cener"}
          position="relative"
          border="1px solid #E1E4EA"
          borderRadius={"12px"}
          gap="1.5em"
        >
          <HiOutlineBuildingOffice2 fontSize={"50px"} />
          <Flex alignItems={"center"}>
            <Text color="#525866">Click to upload document</Text>
          </Flex>

          <Input
            onChange={onFileUpload}
            type="file"
            position={"absolute"}
            opacity={"0"}
            zIndex={100}
            top={0}
            left={0}
            w="100%"
            h="100%"
            cursor="pointer"
          />
        </Flex>
      ) : (
        <Flex justify={"space-between"} p="1.2em 1em">
          <Flex gap="0.8em" alignItems={"center"}>
            <FaFilePdf fontSize={"25px"} />
            {
              !(uploaded instanceof File)  ?
              <Stack gap={"0.2em"}>
                <Text fontWeight={500} fontSize={"14px"}>
                  {uploaded.type}
                </Text>

                <a href={uploaded.document} target="_blank" rel="noopener noreferrer">
                  <Flex direction={'row'} gap='0.5em' alignItems={'center'}>
                    <FaExternalLinkAlt color='blue' fontSize={'15px'} />
                    <Text color='blue' fontSize={'13px'}>Preview</Text>                    
                  </Flex>
                </a>

              </Stack>
              :
              <Stack gap={"0.2em"}>
                <Text fontWeight={500} fontSize={"14px"}>
                  {uploaded.name}
                </Text>
                <Text color="#525866" fontSize={"13px"}>
                  {uploaded.size}
                </Text>
              </Stack>

            }

          </Flex>

          <FaTrashAlt
            cursor={"pointer"}
            fontSize={"25px"}
            onClick={() => {
              onChange(name, null);
            }}
          />
        </Flex>
      )}
    </Box>
  );
};

export const AddPropertyScreenFour = ({
  next,
  previous,
  onChangeFileName,
  loading,
  documents,
}: ButtonFunction) => {
  const { toast } = useToast();
  const subs: any[] = [
    {
      id: 1,
      count: <FaCheck />,
      title: "Property Title & Category",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 2,
      count: <FaCheck />,
      title: "Location & Pricing",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 3,
      count: "3",
      title: "Images",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 4,
      count: "4",
      title: "Documents",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
  ];

  const values = [
    { val: "FamilyReceipt", name: "Family receipt" },
    { val: "SurveyPlan", name: "Survey plan" },
    { val: "Layout", name: "Layout" },
    { val: "Affidavit", name: "Affidavit" },
    { val: "Agreement", name: "Agreement" },
    { val: "CofO", name: "C of O" },
    { val: "PowerOfAttorney", name: "Power of attorney" },
    { val: "GovConsent", name: "Gov Consent" },
  ];
  // const validateDocuments = () => {
  //   const missingDocs = Object.entries(documents).filter(([key, doc]) => !doc);
  //   if (missingDocs.length === 8) {
  //     toast({
  //       title: "Error",
  //       description: `You must upload at least one document`,
  //       status: "error",
  //       position: "top",
  //       duration: 1500,
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  console.log("fine app", loading);

  return (
    <>
      <Box
        w={"100%"}
        px={"20px"}
        className="inter"
        maxH={"600px"}
        overflow={"scroll"}
      >
        <Flex w={"100%"} justifyContent={"space-between"}>
          {subs.map((sub) => (
            <Flex
              key={sub?.id}
              my={"24px"}
              w={"fit-content"}
              alignItems={"center"}
              gap={{ base: "12px", md: "16px" }}
              className="inter"
            >
              <Flex alignItems={"center"} gap={"8px"}>
                <Flex
                  w={"20px"}
                  h={"20px"}
                  border={"1px solid var(--soft200)"}
                  borderRadius={"100%"}
                  bg={`${sub?.bg}`}
                  alignItems={"center"}
                  justifyContent={"center"}
                  textColor={`${sub?.text}`}
                  fontSize={"14px"}
                  fontWeight={400}
                >
                  {sub?.count}
                </Flex>
                <Text
                  fontWeight={400}
                  textColor={"var(--strong950)"}
                  fontSize={"14px"}
                >
                  {sub?.title}
                </Text>
              </Flex>
              <IoIosArrowForward className="arrow" />
            </Flex>
          ))}
        </Flex>

        <Flex flexDir={"column"} gap={"16px"} w="100%" py={"20px"}>
          {values.map((object, key) => (
            <FileInputComponent
              key={key}
              uploaded={documents[object.val as DocumentTypes] as File}
              onChange={onChangeFileName}
              name={object.val}
              title={object.name}
            />
          ))}
        </Flex>

        <Flex gap={"2rem"}>
          <Btn
            onClick={previous}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
          >
            Previous
          </Btn>
          <Btn
            onClick={() => {
              next();
            }}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
            isLoading={loading}
            loadingText="creating"
            disabled={loading}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
          >
            Submit
          </Btn>
        </Flex>
      </Box>
    </>
  );
};
