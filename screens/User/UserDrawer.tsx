import Btn from "@/components/Btn";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import { Modal } from "@/components/modal";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Img,
  Text,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useApiUrl } from "@/hooks/useApi";

const UserDrawer = ({
  isOpen,
  onClose,
  btnRef,
  userEl,
  verify,
  setVerify,
}: any) => {
  const { toast } = useToast();
  const { verifyUser } = useUser();
  const [loading, setLoading] = useState(false);
  // let status = verify === 'Suspended' ? 'Resume' : 'Suspend'
  // console.log(status)

  const status = userEl?.verification === "Rejected" ? "Rejected" : "Resume"
  
  // const { getUser } = useUser();

  // const getUserFn = async () => {
  //   const res:any = await getUser();
  //   console.log(res);
  //   setTable(res?.data?.data);
  // }
  //  toast({
  //    status: "success",
  //    description: "profile updated",
  //    title: "Success",
  //    position: "top",
  //    duration: 1000,
  //  });

  const suspendFn = async (status: string) => {
    if (!userEl._id) {
      toast({
        status: "error",
        description: "Invalid userId",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
      return;
    }
    setLoading(true);

    try {
      const verificationStatus = status === 'Rejected' ? 'Resume' : 'Rejected'
      const res: any = await verifyUser(userEl._id, {
        verification: verificationStatus,
      });
      toast({
        status: "success",
        description: `${userEl.firstName} ${status === 'Rejected' ? 'Resumed' : 'Suspended'}`,
        title: "Success",
        position: "top",
        duration: 1000,
      });
      setLoading(false);
    } catch (error) {
      toast({
        status: "error",
        description: `Failed to ${status} ${userEl.firstName} try again`,
        title: "Failed",
        position: "top",
        duration: 1000,
      });
      setLoading(false);
      console.log(error)
    }
    finally{
      setShowModal(false);
      onClose()
    }
  };


  const fullName = `${userEl?.firstName
    ?.slice(0, 1)
    .toUpperCase()}${userEl?.firstName?.slice(
    1,
    userEl?.firstName.length
  )} ${userEl?.lastName?.slice(0, 1).toUpperCase()}${userEl?.lastName?.slice(
    1,
    userEl?.lastName.length
  )}`;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent p={0}>
        <DrawerCloseButton />
        <DrawerHeader className="robotoF">Profile details</DrawerHeader>

        <DrawerBody p={0}>
          <Flex align={"center"} justify={"center"}>
            <Box>
              <Img src="/dummy.jpg" w="180px" h="172px" borderRadius={"50%"} />
            </Box>
          </Flex>
          <Box p={"6px 20px"} bgColor={"#F5F7FA"} mt="25px">
            <Text
              className="robotoF"
              color="#99A0AE"
              fontSize={".75rem"}
              fontWeight={500}
            >
              Profile
            </Text>
          </Box>
          <Box p="25px 15px">
            <Text className="robotoF" fontSize={"1.125rem"} fontWeight={500}>
              {fullName || "John Doe"}
            </Text>
            <Box mt="10px">
              <Text
                className="robotoF"
                color="#99A0AE"
                fontSize={".75rem"}
                fontWeight={500}
              >
                EMAIL
              </Text>
              <Text
                className="robotoF"
                color="#626871"
                fontSize={".875rem"}
                fontWeight={500}
              >
                {userEl?.email || "johndoe@gmail.com"}
              </Text>
            </Box>
            <Box mt="10px">
              <Text
                className="robotoF"
                color="#99A0AE"
                fontSize={".75rem"}
                fontWeight={500}
              >
                PHONE NO.
              </Text>
              <Text
                className="robotoF"
                color="#626871"
                fontSize={".875rem"}
                fontWeight={500}
              >
                {'+234 000 000 0000'}
              </Text>
            </Box>
            <Box mt="10px">
              <Text
                className="robotoF"
                color="#99A0AE"
                fontSize={".75rem"}
                fontWeight={500}
              >
                USER TYPE
              </Text>
              <Text
                className="robotoF"
                color="#626871"
                fontSize={".875rem"}
                fontWeight={500}
              >
                {userEl?.role || "Buyer"}
              </Text>
            </Box>
            <Box mt="10px">
              <Text
                className="robotoF"
                color="#99A0AE"
                fontSize={".75rem"}
                fontWeight={500}
              >
                PROPERTY
              </Text>
              <Text
                className="robotoF"
                color="#626871"
                fontSize={".875rem"}
                fontWeight={500}
              >
                {userEl?.propertyType || "Nil"}
              </Text>
            </Box>
          </Box>
          <Flex direction={"column"} px="15px" mt={"50px"} mb='15px'>
            <Btn
              bgColor="transparent"
              border="1px solid #335CFF"
              color="#335CFF"
              borderRadius={"10px"}
              className="robotoF"
              fontSize={".875rem"}
              fontWeight={500}
              boxShadow={"0px 1px 2px 0px rgba(10, 13, 20, 0.03)"}
              onClick={() => setShowModal(true)}
              isLoading = {loading}
            >
              { status === 'Rejected' ? 'Resume' : 'Suspend'}
            </Btn>
            {/* <Btn
              bgColor="transparent"
              border="1px solid #FB3748"
              color="#FB3748"
              borderRadius={"10px"}
              mt="10px"
              className="robotoF"
              fontSize={".875rem"}
              fontWeight={500}
              boxShadow={"0px 1px 2px 0px rgba(10, 13, 20, 0.03)"}
            >
              Delete
            </Btn> */}
          </Flex>
          <Modal onClose={toggleModal} isVisible={showModal} label={`${status === 'Rejected' ? 'Resume' : 'Suspend'} User`}>
            <Box className="robotoF">
              <Text>Are you sure you want to {status === 'Rejected' ? 'Resume': 'suspend'} <strong>{fullName || "John Doe"}</strong>?</Text>
              <HStack justify={'center'} mt='15px'>
                <Btn onClick={() => suspendFn(status === 'Rejected' ? "Rejected" : "Resume")}
                  bg={"#335CFF"}
                  isLoading = {loading}
                  loadingText = {status === 'Rejected' ? 'Resuming...' : 'Suspending...'}
                >
                    { status === 'Rejected' ? 'Resume' : 'Suspend'}</Btn>
                <Btn bg={"red"} onClick={toggleModal}>Close</Btn>
              </HStack>
            </Box>
          </Modal>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
