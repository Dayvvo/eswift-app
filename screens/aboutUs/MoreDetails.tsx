import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import { SectionThreeProps } from "../home/sectionThreeProps"


export const MoreDetails =()=> {
    const data = [
        {
            id:1,
            point: 'Expertise: With years of experience in the real estate industry, our team has the knowledge and skills to navigate the complexities of buying, selling, and managing properties'       
        },
        {
            id:2,
            point: 'Digitalized Operations: We leverage technology to streamline the real estate process, offering a user-friendly website for browsing listings, scheduling inspection, marketing property briefs and submitting applications with ease.'
        },
        {
            id:3,
            point:'Personalized Service: We understand that every client is unique, which is why we tailor our services to meet your specific needs and goals.'
        },
        {
            id:4,
            point:'Integrity: At e-Swift PropertyMart, honesty and transparency are at the core of everything we do. You can trust us to always act in your best interests.'
        },
        {
            id:5,
            point:'Consultation & Real Estate Guide: Out of our wealth of expertise, we give consultations, advice and proper investment guidance.'
        },
    ]   

    const specification:any[] = [
        {
            id:1,
            point:'Budget Friendly: At e-Swift, we tailor deals or prices to fit your budget and preferences not ours.',
        },
        {
            id:2,
            point: 'Affordable Quality: e-Swift helps secure properties in rapidly growing locations at a reasonable price.',
        },
        ,
        {
            id:3,
            point: 'Affordable Quality: e-Swift helps secure properties in rapidly growing locations at a reasonable price.',
        },
        {
            id:4,
            point: 'Expert Agents: Our team of experienced and professional agents is dedicated to providing you with personalized service and expert advice throughout your real estate journey.',
        },
        {
            id:5,
            point: 'Stress-Free Transactions: We handle all the paperwork and negotiations electronically, ensuring a smooth and efficient experience for you.',
        },
    ] 


    return (
        <>
            <Flex bg={"transparent"}
                flexDir='column'
                width={"100%"}
                gap={'50px'}
                mb={5}
            >
                <SectionThreeProps mobile={"column"} web={"row"} view={"/Left.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"600px"} listData={data} />
                <SectionThreeProps mobile={"column"} web={"row-reverse"} view={"/Right.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"600px"} listData={specification} />
            </Flex>
        
        </>
    )
}