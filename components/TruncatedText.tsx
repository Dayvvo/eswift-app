import { Text } from "@chakra-ui/react";
import { useState } from "react";
import DOMPurify from "dompurify";

export const TruncatedText = ({
  text,
  maxLength,
}: {
  text: string | undefined;
  maxLength: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded
    ? text
    : shouldTruncate
    ? text.slice(0, maxLength) + "..."
    : text;

  return (
    <div>
      <Text
        className="mulish"
        fontWeight={400}
        color={"#797979"}
        fontSize={".75rem"}
        mt="20px"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(displayText),
        }}
      />
      {shouldTruncate && (
        <Text
          as={"span"}
          mt="-3px"
          cursor={"pointer"}
          className="mulish"
          fontWeight={600}
          onClick={() => setIsExpanded(!isExpanded)}
          color={"#1A1D66"}
          fontSize={".75rem"}
        >
          {isExpanded ? " Read Less" : " Read More"}
          {text.length} {displayText.length}
        </Text>
      )}
    </div>
  );
};
