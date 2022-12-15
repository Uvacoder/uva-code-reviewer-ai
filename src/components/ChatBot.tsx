import {
  Box,
  Center,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import { BeatLoader } from "react-spinners";

type Message = {
  from: "human" | "ai";
  message: string;
};
export const ChatBot: React.FC<{ isChatShown: boolean }> = ({
  isChatShown,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<Message[]>([
    {
      from: "ai",
      message: "こんにちは、AIです。わからないことがあれば聞いてください。",
    },
  ]);
  const sendToAi = async () => {
    if (isLoading) return;
    setInputMessage("");
    setSentMessages((sentMessages) =>
      sentMessages.concat({
        from: "human",
        message: inputMessage,
      })
    );
    setIsLoading(true);
    const res = await axios.post("/api/chatai", {
      message: inputMessage,
    });
    setIsLoading(false);
    setSentMessages((sentMessages) =>
      sentMessages.concat({
        from: "ai",
        message: res.data.result,
      })
    );
  };

  //常にメッセージの一番下にカーソルが置かれるように
  useEffect(() => {
    const floorBoard = document.getElementById("chat-bot-messages");
    if (floorBoard) {
      const bottom = floorBoard.scrollHeight - floorBoard.clientHeight;
      floorBoard.scroll(0, bottom);
    }
  }, [sentMessages]);

  return (
    <>
      {isChatShown && (
        <VStack
          justifyContent="space-between"
          position="fixed"
          bottom={{ base: 24, md: 24 }}
          right={{ base: 4, md: 8 }}
          borderRadius="md"
          boxShadow="md"
          bgColor="white"
          h={{ base: 400, md: 450 }}
          w={{ base: 300, md: 400 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex
            alignItems="center"
            gap={2}
            justifyContent="flex-start"
            w="full"
            bgColor="blue.500"
            borderTopRadius="md"
            px={4}
            py={2}
          >
            <Center bgColor="gray.100" borderRadius="full" p={2}>
              <Image src="/ai.svg" alt="ai" width={20} height={20} />
            </Center>
            <Text fontSize="xl" color="white" fontWeight="bold">
              Mr. AI
            </Text>
          </Flex>
          <VStack
            w="full"
            h="full"
            overflowY="scroll"
            gap={1}
            px={2}
            id="chat-bot-messages"
          >
            {sentMessages.map((message, index) => (
              <Flex
                key={index}
                w="full"
                justifyContent={
                  message.from === "ai" ? "flex-start" : "flex-end"
                }
              >
                <Flex maxW="80%" alignItems="flex-start" gap={2}>
                  {message.from === "ai" && (
                    <Image
                      src="/ai.svg"
                      alt="ai"
                      width={20}
                      height={20}
                      style={{ marginTop: "0.2rem" }}
                    />
                  )}
                  <Box
                    bgColor={message.from === "ai" ? "blue.200" : "gray.200"}
                    p={2}
                    borderRadius="md"
                  >
                    <Text color="blue.500">{message.message}</Text>
                  </Box>
                </Flex>
              </Flex>
            ))}
            {isLoading && (
              <Flex key={"loading"} w="full" justifyContent="flex-start">
                <Flex maxW="80%" alignItems="flex-start" gap={2}>
                  <Image
                    src="/ai.svg"
                    alt="ai"
                    width={20}
                    height={20}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <Box bgColor="blue.200" p={2} borderRadius="md">
                    <BeatLoader size={8} color="#455097" />
                  </Box>
                </Flex>
              </Flex>
            )}
          </VStack>
          <InputGroup px={4} py={3} borderTop="1px" borderColor="blue.500">
            <Input
              placeholder="質問を入力してください"
              autoFocus
              variant="unstyled"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  (e.ctrlKey || e.metaKey || e.shiftKey)
                ) {
                  sendToAi();
                }
              }}
            />
            <InputRightElement
              fontSize="3xl"
              h="full"
              children={
                <Icon
                  as={RiSendPlane2Fill}
                  color={isLoading ? "blue.200" : "blue.500"}
                  cursor={isLoading ? "none" : "pointer"}
                  onClick={sendToAi}
                />
              }
            />
          </InputGroup>
        </VStack>
      )}
    </>
  );
};
