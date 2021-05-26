import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import Image from "next/image";

export default function Card({data}) {
  const { isOpen, onToggle } = Chakra.useDisclosure();

  React.useEffect(() => {
    onToggle();
    return () => onToggle();
  }, []);

  return (
    <Chakra.ScaleFade in={isOpen} initialScale={0.9}>
      <Chakra.Flex
        direction="column"
        p={[2]}
        w={["240px"]}
        h="100%"
        mx="auto"
        borderRadius="xl"
        boxShadow="base"
      >
        <Chakra.Text
          fontWeight="semibold"
          fontSize={["lg", "xl"]}
          lineHeight={["short"]}
          mb={2}
        >
          {data.name}
        </Chakra.Text>
        <Chakra.Divider mb={2} />
        <Image
          src={data?.imageUrl}
          alt={`${data.name} card`}
          height="371px"
          width="224px"
        />
        <Chakra.Flex mt={2} direction="column" flex="1 1">
          <Chakra.StatGroup mb={3}>
            <Chakra.Stat>
              <Chakra.StatLabel color="gray.600" fontSize={["sm"]}>
                Set Name
              </Chakra.StatLabel>
              <Chakra.StatNumber fontSize={["lg"]}>
                {data.set.name}
              </Chakra.StatNumber>
            </Chakra.Stat>
            <Chakra.Stat textAlign="right">
              <Chakra.StatLabel color="gray.600" fontSize={["sm"]}>
                Type
              </Chakra.StatLabel>
              <Chakra.StatNumber fontSize={["lg"]}>
                {data.type}
              </Chakra.StatNumber>
            </Chakra.Stat>
          </Chakra.StatGroup>
          <Chakra.Spacer />
          {data.text && (
            <Chakra.Flex
              fontSize={["xs"]}
              textAlign="center"
              minH={24}
              p={2}
              boxShadow="inner"
              bg="gray.50"
              borderRadius="md"
              justify="center"
              align="center"
            >
              {data.text}
            </Chakra.Flex>
          )}
        </Chakra.Flex>
      </Chakra.Flex>
    </Chakra.ScaleFade>
  );
}