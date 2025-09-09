import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  // Image,
  Modal,
  ModalOverlay,
  ModalContent,
  Checkbox,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
import Image from "next/image";
import useProperty from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import { PropertyCard, PropertyCardProps } from "./propertyCard";
import { useRouter } from "next/router";
import { SuspendState, DeleteProperty, VerifyState, DeclineState, SoldState } from "./VerificationState";
import useToast from "@/hooks/useToast";
import { AddProperties } from "./Add";
import { BiEdit } from "react-icons/bi";
import { color } from "framer-motion";
import { BackIcon } from "@/components/svg";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const PropertyDetails = ({
  my,
  p,
  cardWidth,
}: {
  my?: string;
  p?: string;
  cardWidth?: any;
}) => {
  type activeModalType =
    | "suspend"
    | "Pending"
    | "Verified"
    | "Rejected"
    | "Sold"
    | "delete"
    | "gallery"
    | "documents"
    | "edit";

  const { globalContext } = useAppContext();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    avatar: "",
    propertyCount: 0,
    phoneNumber: "",
  });

  const [detailsData, setDetailsData] = useState<PropertyCardProps | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<activeModalType | null>(null);
  const [activeModal, setActiveModal] = useState(false);
  const [itemIdInModal, setItemIdInModal] = useState("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(
    detailsData?.verification
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { toast } = useToast();
  const router = useRouter();

  const {
    getPropertyDetails,
    propertyCreator,
    verifyProperty,
    deleteProperty,
    getAdminProperty,
  } = useProperty();

  const id = router.query.id as string;

  const getPropertyDetailFn = async () => {
    setLoading(true);
    try {
      const request = await getPropertyDetails(id);
      const data = request.data as R;
      setVerificationStatus(data?.data.verification);
      if (data.statusCode === 200) {
        const creator = await propertyCreator(data?.data?.creatorID);

        setUser(creator?.data?.data);
      }
      setDetailsData(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyFunction = async () => {
    setIsVerifying(true);
    try {
      setIsVerifying(false);
      const getAllProperties = await getAdminProperty("", 1);
      setGetProperty(getAllProperties?.data?.data);
    } catch (error) {
      setIsVerifying(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertyFunction();
  }, [isVerifying]);

  const toggleModal = () => {
    setActiveModal((prevState) => !prevState);
  };

  const openModal = (state: activeModalType, documentUrl?: string) => {
    if (state === "documents" && documentUrl) {
      setSelectedDocument(documentUrl);
    } else {
      setSelectedDocument(null);
    }

    toggleModal();
    setModalType(state);
  };

  const verifyPropertyFn = async (status: string) => {
    if (!id) {
      toast({
        status: "error",
        description: "Invalid property ID",
        title: "Error",
        position: "top",
        duration: 1000,
      });
      return;
    }
    setIsVerifying(true);
    try {
      const req = await verifyProperty(id, {
        verification: status,
      });
      
      if (req.statusCode === 201) {
        setVerificationStatus(req.data);
        toast({
          status: "success",
          description: `Property ${req.data}`,
          title: "Success",
          position: "top",
          duration: 1000,
        });
      }
    } catch (err: any) {
      toast({
        status: "error",
        description: err.response.data.message || "Failed to perform action",
        title: "Failed",
        position: "top",
        duration: 1500,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const deletePropertyFn = async () => {
    setIsVerifying(true);
    try {
      const req = await deleteProperty(id); // If no error occurs, the following code runs

      router.push("/listing");
      toast({
        status: "success",
        description: "Property deleted",
        title: "Success",
        position: "top",
        duration: 1000,
      });
      setIsVerifying(false);
    } catch (err: any) {
      console.log("err", err.response.data.message)
      toast({
        status: "error",
        description: err.response.data.message || "Failed to delete property",
        title: "Failed",
        position: "top",
        duration: 1500,
      });
      setIsVerifying(false);
      console.log("err", err);
    }
  };

  useEffect(() => {
    getPropertyDetailFn();
  }, [id, showModal, isVerifying]);

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        onClose={toggleModal}
        isOpen={activeModal}
        size={"2xl"}
        // h={"100vh"}
      >
        <ModalOverlay />
        <ModalContent h={modalType === "documents" ? "70vh" : "auto"}>
          {modalType === "Verified" ? (
            <VerifyState
              verifyPropertyFn={verifyPropertyFn}
              isVerifying={isVerifying}
              toggleModal={toggleModal}
            />
          ) : modalType === "Rejected" ? (
            <DeclineState
              toggleModal={toggleModal}
              isVerifying={isVerifying}
              verifyPropertyFn={verifyPropertyFn}
            />
          ) : modalType === "Sold" ? (
            <SoldState
              toggleModal={toggleModal}
              isVerifying={isVerifying}
              verifyPropertyFn={verifyPropertyFn}
            />
          ) : modalType === "delete" ? (
            <DeleteProperty
              toggleModal={toggleModal}
              isVerifying={isVerifying}
              deletePropertyFn={deletePropertyFn}
            />
          ) : modalType === "documents" && selectedDocument ? (
            // <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            //   <Viewer
            //     fileUrl={selectedDocument}
            //     plugins={[defaultLayoutPluginInstance]}
            //   />
            // </Worker>
            <iframe
              src={selectedDocument}
              width="100%"
              height="100%"
            ></iframe>
          ) : (
            <></>
          )}
        </ModalContent>
      </Modal>

      {detailsData?._id ? (
        <AddProperties
          property={detailsData as PropertyCardProps}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <></>
      )}

      <Box bg={"#FFF"} w={"100%"}>
        <Box
          cursor={"pointer"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          border={"1px solid #E1E4EA"}
          borderRadius={"50%"}
          maxW={"30px"}
          h="30px"
          onClick={() => router.back()}
        >
          <BackIcon color="black" />
        </Box>
        {loading && (
          <Stack spacing={4} p={4}>
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}
        {!loading && detailsData && (
          <>
            <Flex w={"100%"} my={my || "24px"} pos={"relative"}>
              <Grid
                templateColumns={
                  detailsData?.images.length === 1 ? "" : "repeat(2, 1fr)"
                }
                gap={"16px"}
                w={"100%"}
                h={"max-content"}
              >
                {detailsData?.images.map((item: any, index: any) => (
                  <GridItem rowSpan={index === 0 ? 2 : 1} key={item}>
                    <Box overflow={"hidden"} borderRadius={"10px"} maxH={"65vh"} h={{base: "300px", lg: "100%"}}>        
                   <Image
                      width={1000}
                      height={1000}
                      style={{ borderRadius: "10px", objectFit: "cover", width: "100%", height: "100%" }}
                      // h={"100%"}
                      src={item}
                      alt={`Image`}
                      // maxHeight={"65vh"}
                      objectFit="cover"
                    /></Box>

                  </GridItem>
                ))}
              </Grid>
              <Flex
                w={"100%"}
                pos={"absolute"}
                justifyContent={"end"}
                insetBlockEnd={0}
              >
                <Flex
                  cursor={"pointer"}
                  bg={"#FFF"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"250px"}
                  h={{ base: "48px", lg: "60px" }}
                  borderRadius={"8px"}
                  gap={"16px"}
                  className="robotoF"
                  textColor={"#03142B"}
                  fontWeight={500}
                  fontSize={{ base: "18px", lg: "30px" }}
                >
                  <Text>View Gallery</Text>
                  <FaRegImages />
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} p={p || "20px"} gap={"24px"}>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                className="montserrat"
                w={"100%"}
                alignItems={{ base: "", lg: "center" }}
                justifyContent={"space-between"}
                fontWeight={600}
                textColor={"#000"}
                fontSize={{ base: "20px", lg: "35px" }}
                gap={"1.5em"}
              >
                <Flex
                  w="100%"
                  justify={"space-between"}
                  align={"center"}
                  gap="1em"
                >
                  <Text
                    lineHeight={{ base: "25px", lg: "40px" }}
                    fontWeight="600"
                    fontSize={{ base: "20px", lg: "35px" }}
                  >
                    {detailsData?.title}
                  </Text>
                  <Btn onClick={() => setShowModal(true)} leftIcon={<BiEdit />}>
                    {" "}
                    Edit{" "}
                  </Btn>
                </Flex>
                <Text fontWeight={500} display={"flex"} alignItems={"center"}>
                  <TbCurrencyNaira />
                  <Text as={"span"}>{detailsData?.price?.amount}</Text>
                </Text>
              </Flex>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                w={"100%"}
                justifyContent={"space-between"}
                gap={"26px"}
              >
                <Flex
                  flexDir={"column"}
                  w={"100%"}
                  gap={"18px"}
                  className="roboto"
                >
                  <Flex
                    w={"100%"}
                    alignItems={{ base: "start", md: "center" }}
                    gap={"4px"}
                    textColor={"#626871"}
                    fontWeight={400}
                    fontSize={{ base: "20px", lg: "28px" }}
                  >
                    <HiOutlineLocationMarker />
                    <Text>{detailsData?.address}</Text>
                  </Flex>
                  <Text
                    textColor={"#626871"}
                    fontWeight={400}
                    fontSize={"18px"}
                    className="roboto"
                  >
                    {detailsData?.description}
                  </Text>
                  <Box fontSize={"18px"} fontWeight={300} textColor={"#626871"}>
                    <Text>Key Features</Text>
                    {detailsData?.features?.map(
                      (feature: string, index: number) => {
                        return (
                          <Flex key={index} alignItems={"center"} gap={"4px"}>
                            <BsDot />
                            <Text>
                              {feature.slice(0, 1).toUpperCase()}
                              {feature.slice(1, feature.length).toLowerCase()}
                            </Text>
                          </Flex>
                        );
                      }
                    )}
                  </Box>
                  <Flex
                    bg={"var(--weak50)"}
                    w={"100%"}
                    alignItems={"center"}
                    px={"20px"}
                    py={"6px"}
                    className="robotoF"
                  >
                    <Text
                      fontSize={"12px"}
                      fontWeight={500}
                      textColor={"var(--soft400)"}
                    >
                      DOCUMENTS
                    </Text>
                  </Flex>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {detailsData?.documents?.map((document, key) => {
                      return (
                        <Flex
                          key={String(document?.type) + key}
                          alignItems={"center"}
                          position={"relative"}
                          borderRadius={"8.5px"}
                          border={"0.71px solid var(--soft200)"}
                          px={"10px"}
                          w={"100%"}
                          h={"52px"}
                        >
                          <Box fontSize={"12px"}> {document?.type} </Box>
                          <Btn
                            pos={"absolute"}
                            bg={"transparent"}
                            display={"flex"}
                            w={"38px"}
                            h={"24px"}
                            alignItems={"center"}
                            borderRadius={"6px"}
                            border={"0.71px solid var(--soft200)"}
                            className="inter"
                            textColor={"var(--sub600)"}
                            fontSize={"10px"}
                            fontWeight={500}
                            insetEnd={4}
                            onClick={() =>
                              openModal("documents", document.document)
                            }
                          >
                            View
                          </Btn>
                        </Flex>
                      );
                    })}
                  </SimpleGrid>
                </Flex>
                <Flex
                  flexDir={"column"}
                  w={{ base: "100%", lg: "20%" }}
                  gap={"16px"}
                  className="robotoF"
                >
                  {user.role === "ADMIN" ? (
                    verificationStatus === "Pending" ? (
                      <Flex gap={"16px"} direction={"column"}>
                        <Btn
                          bg={"transparent"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                          border="1px solid var(--primaryBase)"
                          borderRadius={"10px"}
                          h={"40px"}
                          textColor={"var(--primaryBase)"}
                          onClick={() => openModal("Verified")}
                        >
                          Verify
                        </Btn>
                        <Btn
                          bg={"transparent"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                          border="1px solid var(--errorBase)"
                          borderRadius={"10px"}
                          h={"40px"}
                          textColor={"var(--errorBase)"}
                          onClick={() => openModal("Rejected")}
                        >
                          Reject
                        </Btn>
                      </Flex>
                    ) : (
                      <Flex gap={"16px"} direction={"column"}>

                     {(verificationStatus === "Verified" || verificationStatus === "Sold") && <Box>
                      {verificationStatus === "Sold" ? 
                      <Text color={"#10B981"}>Sold</Text>
                      : <Btn
                          bg={"transparent"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                          border={"1px solid #10B981"}
                          borderRadius={"10px"}
                          h={"40px"}
                          textColor={"#10B981"}
                          onClick={() => openModal("Sold")}
                        >
                          Sold
                        </Btn>}
                        </Box>}
                        <Btn
                          bg={"transparent"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                          border="1px solid var(--errorBase)"
                          borderRadius={"10px"}
                          h={"40px"}
                          textColor={"var(--errorBase)"}
                          onClick={() => openModal("delete")}
                        >
                          Delete
                        </Btn>
                      </Flex>
                    )
                  ) : (
                    <></>
                  )}
                  <Flex
                    bg={"var(--weak50)"}
                    w={"100%"}
                    alignItems={"center"}
                    px={"20px"}
                    py={"6px"}
                    className="robotoF"
                  >
                    <Text
                      fontSize={"12px"}
                      fontWeight={500}
                      textColor={"var(--soft400)"}
                    >
                      {user?.role}
                    </Text>
                  </Flex>
                  <Flex
                    flexDir={"column"}
                    gap={"16px"}
                    w={"100%"}
                    p={"20px"}
                    className="robotoF"
                  >
                    <Flex alignItems={"center"} gap={4}>
                      <Box
                        overflow={"hidden"}
                        borderRadius={"100%"}
                        h={"40px"}
                        w={"42px"}
                      >
                        {user.avatar.length < 1 && (
                          <Image
                          style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }}
                          height={100}
                          width={100}
                            src={"/profile.png"}
                            alt=""
                          />
                        )}
                        {user.avatar.length > 0 && (
                          <Image
                            src={user.avatar}
                            alt="avatar"
                            style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }}
                            height={100}
                            width={100}
                          />
                        )}
                      </Box>
                      <Text fontWeight={500} fontSize={"18px"}>
                        {`${user.firstName} ${user.lastName}`}
                      </Text>
                    </Flex>
                    <Box textColor={"#626871"} fontWeight={500}>
                      <Text
                        mb={"4px"}
                        textColor={"var(--soft400)"}
                        fontSize={"12px"}
                      >
                        EMAIL
                      </Text>
                      <Text fontSize={"14px"}>{`${user.email}`}</Text>
                    </Box>
                    <Flex w={"100%"} gap={"28px"}>
                      <Box textColor={"#626871"} fontWeight={500}>
                        <Text
                          mb={"4px"}
                          textColor={"var(--soft400)"}
                          fontSize={"12px"}
                        >
                          PHONE NO.
                        </Text>
                        <Text fontSize={"14px"}>{user?.phoneNumber}</Text>
                      </Box>
                      <Box textColor={"#626871"} fontWeight={500}>
                        <Text
                          mb={"4px"}
                          textColor={"var(--soft400)"}
                          fontSize={"12px"}
                        >
                          USER TYPE
                        </Text>
                        <Text fontSize={"14px"}>Affiliate</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w={"100%"}
              justifyContent={"space-around"}
              gap={{ base: "24px", lg: "20px" }}
              flexWrap={"wrap"}
              mt={{ base: "60px", lg: "120px" }}
            >
              {getProperty.map((property, index) => {
                return (
                  <PropertyCard
                    key={property?._id}
                    _id={property?._id}
                    images={property?.images}
                    title={property?.title}
                    price={property?.price}
                    address={property?.address}
                    verificationState={property?.verification}
                    userImage={user?.avatar || "/"}
                    email={user?.email}
                    user={user?.firstName}
                    // count={page}
                  />
                );
              })}
            </Flex>
          </>
        )}
        {!loading && !detailsData && (
          <Card>
            <CardBody>
              <Text>Property details not available please try again</Text>
            </CardBody>
          </Card>
        )}
      </Box>
    </>
  );
};
