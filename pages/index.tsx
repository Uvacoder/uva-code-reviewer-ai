import {
  Box,
  Textarea,
  Text,
  Button,
  Container,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChatBot } from "../src/components/ChatBot";
import Footer from "../src/components/Footer";
import { Header } from "../src/components/Header";

export default function Home() {
  const [result, setResult] = useState<string>();
  const codeMirrorRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codeMirrorInstance, setCodeMirrorInstance] = useState<any>();
  const [isChatShown, setIsChatShown] = useState<boolean>(false);

  const handleCodeCheck = async () => {
    const lines: { text: string }[] = codeMirrorInstance.doc.children[0].lines;
    const text = lines.reduce(
      (accumulator, currentValue) => accumulator + currentValue.text,
      ""
    );
    if (!text) {
      window.alert("先にコードを入力してください");
      return;
    }
    if (text.length > 2048) {
      window.alert("コードが長すぎます。2048文字以内におさめてください");
      return;
    }
    setIsLoading(true);
    const res = await axios.post("/api/openai", {
      code: text,
    });
    setResult(res.data.result);
    setIsLoading(false);
  };
  useEffect(() => {
    require("codemirror/mode/javascript/javascript");
    const CodeMirror = require("codemirror");
    const instance = CodeMirror.fromTextArea(codeMirrorRef.current, {
      lineNumbers: true,
      lineWrapping: true,
      theme: "material",
      mode: "javascript",
    });
    setCodeMirrorInstance(instance);
    instance.setSize("100%", "100%");
  }, []);

  const closeWithClickOutSideMethod = (e: React.MouseEvent) => {
    if (document.getElementById("chat-content") !== e.target) {
      setIsChatShown(false);
    }
  };

  return (
    <Box
      bgColor="blue.200"
      position="relative"
      onClick={closeWithClickOutSideMethod}
    >
      <Head>
        <title>AI Code Reviewer</title>
        <meta name="description" content="Automatic code review by AI" />
        <link rel="icon" href="/ai_white.svg" />
      </Head>
      <Container
        maxWidth={{ base: "100%", md: "90%", lg: "80%" }}
        h="100vh"
        display="flex"
        py={4}
        flexDirection="column"
        justifyContent="space-between"
        gap={{ base: 2, lg: 4 }}
      >
        <Header />
        <Box>
          <Center
            p={6}
            gap={4}
            bgColor="Black"
            borderTopRadius="md"
            flexDirection={{ base: "column", md: "row" }}
            h="60vh"
          >
            <Textarea ref={codeMirrorRef} />
            <Box
              w="full"
              h="full"
              bgColor="gray.100"
              p={{ base: 2, md: 8 }}
              overflowY="scroll"
            >
              {result ? (
                <Text fontSize="md">{result}</Text>
              ) : (
                <Center w="full" h="full" flexDirection="column">
                  <Image src="/icon.svg" width={300} height={300} alt="icon" />
                </Center>
              )}
            </Box>
          </Center>
          <Button
            colorScheme="blue"
            w="full"
            p={6}
            onClick={handleCodeCheck}
            isLoading={isLoading}
            loadingText="レビュー中・・・"
            spinnerPlacement="start"
            fontSize="xl"
            borderEndRadius="md"
            borderTopRadius="none"
          >
            <Text fontSize="xl">レビューを見る</Text>
          </Button>
        </Box>
        <Footer />
        <Center
          bgColor="blue.500"
          position="fixed"
          bottom={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          p={4}
          cursor="pointer"
          borderRadius="full"
          border="4px"
          borderColor="gray.100"
          boxShadow="md"
          onClick={(e) => {
            e.stopPropagation();
            setIsChatShown((flag) => !flag);
          }}
          id="chat-content"
        >
          <Image src="/ai_white.svg" alt="ai" width={56} height={56} />
        </Center>
        <ChatBot isChatShown={isChatShown} />
      </Container>
    </Box>
  );
}
