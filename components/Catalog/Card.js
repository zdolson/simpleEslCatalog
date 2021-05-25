import * as React from "react";
import * as Chakra from "@chakra-ui/react";

export default function Card({data}) {
  return (
    <Chakra.Box p={[2]} maxW={["240px"]}>
      <Chakra.Text
        fontWeight="semibold"
        fontSize={["xl"]}
        lineHeight={["short"]}
        mb={2}
      >
        {data.name}
      </Chakra.Text>
      <Chakra.Divider mb={2} />
      <Chakra.AspectRatio ratio={0.6034} mx="auto">
        <Chakra.Image src={data?.imageUrl} alt={`${data.name} card`} />
      </Chakra.AspectRatio>
      <Chakra.Box mt={2}>
        <Chakra.StatGroup mb={4}>
          <Chakra.Stat>
            <Chakra.StatLabel color="gray.600">Set Name</Chakra.StatLabel>
            <Chakra.StatNumber fontSize={["xl"]}>
              {data.set.name}
            </Chakra.StatNumber>
          </Chakra.Stat>
          <Chakra.Stat textAlign="right">
            <Chakra.StatLabel color="gray.600">Type</Chakra.StatLabel>
            <Chakra.StatNumber fontSize={["xl"]}>{data.type}</Chakra.StatNumber>
          </Chakra.Stat>
        </Chakra.StatGroup>
        <Chakra.Text fontSize={["sm"]}>{data.text}</Chakra.Text>
      </Chakra.Box>
    </Chakra.Box>
  );
}