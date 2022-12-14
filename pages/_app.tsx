import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { customTheme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
