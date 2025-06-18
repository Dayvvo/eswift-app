import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import moment from "moment";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";

type BlogCardProps = {
  picture?: string;
  title?: string;
  date?: string;
  details?: string;
  id?: string;
};

export const BlogCard = ({
  picture,
  title,
  date,
  details,
  id,
}: BlogCardProps) => {
  const splitText = details?.split(" ");

  let truncatedText = "";
  if (!splitText || splitText?.length == 0) {
    truncatedText = "";
  } else if (splitText?.length > 10) {
    truncatedText = `${splitText.slice(0, 10).join(" ")} ...`;
  } else {
    truncatedText = splitText.join(" ");
  }

  const navigate = useRouter();

  return (
    <>
      <Box
        onClick={() => navigate.push(`/blogspot/${id}`)}
        className="roboto"
        cursor={"pointer"}
        bg={"#FFF"}
        maxW={"388px"}
        h={{ base: "500px", lg: "600px" }}
        px={{ base: "12px", lg: "16px" }}
        py={{ base: "14px", sm: "20px" }}
        overflow={"hidden"}
        border={"1px solid #262626"}
        borderRadius={"12px"}
      >
        <Flex
          position={"relative"}
          w="100%"
          h={{ base: "280px", lg: "306px" }}
          mb={{ base: "20px", lg: "40px" }}
        >
          <Image
            width={1000}
            height={1000}
            src={picture || "/blogdumy.png"}
            alt={"project"}
          />
          {/* <Img src={picture} alt={title} w="100%" /> */}
        </Flex>
        <Flex
          className="roboto"
          flexDir={"column"}
          gap={"10px"}
          w={"100%"}
          mb={{ base: "14px", lg: "20px" }}
        >
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={{ base: "12px", lg: "14px" }}
            fontWeight={500}
            textColor={"#848484"}
          >
            {moment(date).format("DD.MM.YYYY")}
          </Text>
          <Text
            fontSize={{ base: "16px", lg: "22px" }}
            fontWeight={300}
            textColor={"#1A1D66"}
          >
            {title}
          </Text>
          <Text
            fontSize={{ base: "12px", lg: "14px" }}
            fontWeight={300}
            textColor={"#3A3148"}
            textOverflow={"ellipsis"}
            // whiteSpace={"nowrap"}
            overflow={"hidden"}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(truncatedText as string),
            }}
          />
          {/* <Text
            fontSize={"14px"}
            fontWeight={300}
            textColor={"#3A3148"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {details}
          </Text> */}
        </Flex>
      </Box>
    </>
  );
};
