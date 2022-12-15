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
import { useTranslate } from "../src/hooks/useTranslate";

export default function Home() {
  const t = useTranslate();
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
        <title>{t.title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta name="description" content={t.description} />
        <meta property="og:title" content={t.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={t.description} />
        <meta property="og:site_name" content={t.title} />
        <link rel="apple-touch-icon" sizes="180x180" href="/ai_white.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ai_white.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ai_white.svg" />
        <meta name="twitter:site" content="@yui_active" />
        <meta name="twitter:creator" content="@yui_active" />
        <meta
          property="og:image"
          key="ogImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/OGP.jpg`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/OGP.jpg`}
        />
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
            loadingText={t.reviewing}
            spinnerPlacement="start"
            fontSize="xl"
            borderEndRadius="md"
            borderTopRadius="none"
          >
            <Text fontSize="xl">{t.getReview}</Text>
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
