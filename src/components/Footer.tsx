import { Text, Flex, Image, Link, HStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ md: "row", base: "column" }}
      as="footer"
      role="contentinfo"
      px={{ base: "4", md: "8" }}
      py={2}
      gap={2}
    >
      <Text fontSize="base" color="blue.500">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="https://twitter.com/yui_active">Yuiko Koyanagi</Link> All
        rights reserved.
      </Text>
      <HStack>
        <a
          href="https://www.producthunt.com/posts/ai-code-reviewer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ai&#0045;code&#0045;reviewer"
          target="_blank"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=371538&theme=light"
            alt="AI&#0032;Code&#0032;Reviewer - AI&#0032;reviews&#0032;your&#0032;code&#0046; | Product Hunt"
            h={{ base: 10, md: 12, lg: 14 }}
          />
        </a>
        <a
          href="https://www.buymeacoffee.com/yuikoito"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={"/buyMeACoffee.svg"}
            alt={"buy"}
            borderRadius={"xl"}
            h={{ base: 10, md: 12, lg: 14 }}
            cursor="pointer"
          />
        </a>
      </HStack>
    </Flex>
  );
};

export default Footer;
