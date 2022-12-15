import { Text, Flex, Image, Link } from "@chakra-ui/react";

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
    </Flex>
  );
};

export default Footer;
