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
      <Chakra.Box px={10} mt={8} mb={5}>
        <Chakra.Heading as="h1" align="center">ESL Catalog</Chakra.Heading>
        <Catalog />
      </Chakra.Box>
    </React.Fragment>
  );
}
