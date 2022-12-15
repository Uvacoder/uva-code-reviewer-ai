import { Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Flex alignItems="center" gap={4}>
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
    </Flex>
  );
};
