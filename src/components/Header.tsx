import { Flex, Text, Image, Center, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useTranslate } from "../hooks/useTranslate";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export const Header: React.FC = () => {
  const t = useTranslate();
  const snsUrl = (type: "TWITTER" | "FACEBOOK") => {
    const hash = `#AICodeReviewer`;
    const shareText = t.shareText;
    switch (type) {
      case "TWITTER":
        return (
          `https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_BASE_URL}&text=` +
          encodeURIComponent(shareText + `\n` + hash)
        );
      case "FACEBOOK":
        return `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}&t=${shareText}\n${hash}`;
    }
  };
  return (
    <Flex
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: 2, md: 0 }}
    >
      <Center gap={4}>
        <Image
          src="/ai.svg"
          width={{ base: 12, lg: 14 }}
          height={{ base: 12, lg: 14 }}
          alt="icon"
        />
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color="blue.500"
        >
          AI Code Reviewer
        </Text>
      </Center>
      <HStack>
        <Button
          colorScheme="facebook"
          leftIcon={<FaFacebook />}
          onClick={() => window.open(snsUrl("FACEBOOK"), "_blank")}
        >
          Share
        </Button>
        <Button
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          onClick={() => window.open(snsUrl("TWITTER"), "_blank")}
        >
          Tweet
        </Button>
      </HStack>
    </Flex>
  );
};
