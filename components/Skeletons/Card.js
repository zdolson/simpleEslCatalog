import * as React from "react";
import * as Chakra from "@chakra-ui/react";

export default function SkeletonCard() {
  return (
    <Chakra.Box p={[2]} maxW={["240px"]} h="100%" mx="auto">
      <Chakra.SkeletonText noOfLines={1} mb={2} />
      <Chakra.Divider mb={2} />
      <Chakra.Skeleton h="331px" w="200px" mx="auto" />
      <Chakra.Box mt={2}>
        <Chakra.StatGroup mb={4}>
          <Chakra.Stat>
            <Chakra.StatLabel>Set Name</Chakra.StatLabel>
            <Chakra.SkeletonText noOfLines={1} />
          </Chakra.Stat>
          <Chakra.Stat textAlign="right">
            <Chakra.StatLabel>Type</Chakra.StatLabel>
            <Chakra.SkeletonText noOfLines={1} />
          </Chakra.Stat>
        </Chakra.StatGroup>
        <Chakra.SkeletonText noOfLines={4} />
      </Chakra.Box>
    </Chakra.Box>
  );
}