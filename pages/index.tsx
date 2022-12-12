import { Box, Textarea, Text, Button, Container } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>();
  const [result, setResult] = useState<string>();
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setValue(e.target.value);
  };
  const handleCodeCheck = async () => {
    const res = await axios.post("/api/openai", {
      code: value,
    });
    setResult(res.data.result);
  };
  return (
    <>
      <Head>
        <title>Code Reviewer</title>
        <meta name="description" content="Automatic code review by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Text mb="8px">コードレビュー</Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Button onClick={handleCodeCheck}>コードレビューをする！</Button>
        <Text>結果</Text>
        <Box>{result}</Box>
      </Container>
    </>
  );
}
