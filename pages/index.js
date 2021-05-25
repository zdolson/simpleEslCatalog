import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import Head from 'next/head';
import Catalog from "../components/Catalog";

export default function Home() {

  return (
    <React.Fragment>
      <Head>
        <title>ESL Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chakra.Box px={10}>
        <Chakra.Heading as="h1">Home</Chakra.Heading>
        <Catalog />
      </Chakra.Box>
    </React.Fragment>
  );
}
