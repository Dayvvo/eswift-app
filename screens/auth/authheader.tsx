import { Flex, Text } from "@chakra-ui/react"
import Image from "next/image"

type AuthHeaderProps = {
    icon?: string,
    title?: string, 
    description?: string,
    user?: string,
}

export const AuthHeaderProps =({
    icon, title, description, user
}:AuthHeaderProps) => {
    return(
        <Flex 
            flexDir={'column'}
            alignItems={'center'}
            w={'100%'}
            gap={'6px'}
            className="robotoF"
        >
            <Image 
                width={96}
                height={96}
                src={`${icon}`} alt="/"
            />
            <Text
                textColor={'var(--strong950)'}
                fontSize={{base:'20px',lg:'22px'}}
                textAlign={'center'}
                fontWeight={500}
            >
                {title}
            </Text>
            <Text
                textColor={'var(--sub600'}
                fontSize={{base:'10px',lg:'14px'}}
                textAlign={'center'}
                fontWeight={400}
            >
                {description} <Text as={'span'} fontWeight={500} textColor={'var(--strong950)'}>
                    {user || null}
                </Text>
            </Text>
            
        </Flex>
    )
}