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

export default function Home() {
  const [result, setResult] = useState<string>();
  const codeMirrorRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codeMirrorInstance, setCodeMirrorInstance] = useState<any>();

  const handleCodeCheck = async () => {
    const lines: { text: string }[] = codeMirrorInstance.doc.children[0].lines;
    const text = lines.reduce(
      (accumulator, currentValue) => accumulator + currentValue.text.trim(),
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

  return (
    <Box bgColor="blue.200">
      <Head>
        <title>Code Reviewer</title>
        <meta name="description" content="Automatic code review by AI" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <Container
        maxWidth={{ base: "100%", md: "90%", lg: "80%" }}
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={{ base: 2, lg: 4 }}
      >
        <Text fontSize="4xl" fontWeight="bold">
          AI Code Reviewer
        </Text>
        <Box>
          <Center
            p={6}
            gap={4}
            bgColor="Black"
            borderTopRadius="md"
            flexDirection={{ base: "column", md: "row" }}
            h="70vh"
          >
            <Textarea ref={codeMirrorRef} />
            <Box w="full" h="full" bgColor="gray.100" p={{ base: 2, md: 8 }}>
              {result ? (
                <Text>{result}</Text>
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
            p={8}
            onClick={handleCodeCheck}
            isLoading={isLoading}
            loadingText="レビュー中・・・"
            spinnerPlacement="start"
            fontSize="2xl"
            borderEndRadius="md"
            borderTopRadius="none"
          >
            <Text fontSize="2xl">レビューを見る</Text>
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
