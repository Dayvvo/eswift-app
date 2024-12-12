import Preloader from "../components/Preloader";
import { AppContextWrapper } from "../context";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

export const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  colors: {
    primary: "#F9DBBA",
    secondary: "#5B99C2",
    tertiary: "#1A4870",
    quaternary: "#1F316F",
  },
  fonts: {
    heading: poppins.className,
    body: poppins.className,
  },
});



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <AppContextWrapper>
          <Head>
            <title>e-Swift</title>
            <meta name="Eswift Property Mart" content="Eswift Property Mart" />
            <link rel="icon" href="/footer.png" />
          </Head>
          {/* <Preloader/> */}
          <Component {...pageProps} />
        </AppContextWrapper>
    </ChakraProvider>
  );
}
