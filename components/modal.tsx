import { Box, Flex, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
    children?: ReactNode;
    onClose?: any;
    isVisible?: any;
    label?: string;
}
export const Modal:React.FC<ModalProps> =({
    children, onClose , isVisible, label,
})=> {

    const ModalClose =(e:any)=>{
        if(e.target.id === "close")
        onClose()
    };

    if (!isVisible) return null;

    return (
        <Box
            onClick={ModalClose}
            w={'100%'} h={'100%'}
            zIndex={100} bg={'#00000075'}
            backdropFilter={'blur(10px)'}
            pos={'fixed'} top={0} left={0}
        >
            <Flex 
                id="close"
                px={'12px'}
                w={'100vw'} h={'100vh'}
                justifyContent={'center'} alignItems={'center'}
            >
                <Flex
                    flexDir={'column'}
                    bg={'#FFFFFF'}
                    maxW={'768px'} h={'fit-content'}
                    borderRadius={'15px'} px={{base:'16px', md:'40px'}}
                    py={{base:'12px',md:'20px'}}
                >
                    <Flex 
                        w={'100%'} h={'fit-content'} 
                        gap={'12px'} justifyContent={'space-between'} alignItems={'center'}
                        p={'20px'} className="robotoF" textColor={'var(--strong950)'}
                    >
                        <Text 
                            fontSize={'18px'} fontWeight={500}
                        >
                            {label || "Add Property"}
                        </Text>
                        <Box 
                            cursor={'pointer'}
                            fontSize={'18px'}
                            onClick={onClose}>
                            <RxCross2 />
                        </Box>
                    </Flex>
                    {children}
                </Flex>
            </Flex>
        </Box>
    
    )
}