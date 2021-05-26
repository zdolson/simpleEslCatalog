import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { useDebounce, useIntersection } from "react-use";

import Card from "./Card";
import SkeletonCatalog from "../Skeletons/Catalog";
import useCards from "../../hooks/useCards";

const CatalogLoader = React.memo(function CatalogLoader({
  currentPage,
  maxPage,
  searchQuery,
  increaseMaxPage,
  setTotalCount,
}) {
  const { data, isLoading, isError } = useCards(currentPage, searchQuery);
  const loadMoreRef = React.useRef();
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  React.useEffect(() => {
    /*
     *  We only care about the value returned by the first function.
     *  Otherwise, we would temporarily be setting totalResults as undefined
     *  during fetches.
     */
    if (currentPage === 0 && data?.cards) {
      setTotalCount(data._totalCount);
    }
  }, [data, currentPage]);

  React.useEffect(() => {
    const canFetchMoreData = !!data?._links?.next || false;
    const inView = intersection && intersection.intersectionRatio >= 1;
    /*
     *  Conditions to increase maxPage
     *  1. if current component holds the newest page
     *  2. user is at the bottom of the page, such that ref is interescting with view
     *  3. we aren't currently loading data with SWR
     *  4. we know that we can fetch more data by checking the response's links
     */
    if (inView && currentPage === maxPage && !isLoading && canFetchMoreData) {
      increaseMaxPage();
    }
  }, [intersection, currentPage, maxPage, isLoading, data, increaseMaxPage]);

  return (
    <React.Fragment>
      {isLoading && <SkeletonCatalog />}
      {data?.cards &&
        data?.cards.map((card) => <Card key={card?.id} data={card} />)}
      <Chakra.Box
        ref={loadMoreRef}
        position="absolute"
        bottom={2.5}
        display={currentPage === maxPage ? "block" : "none"}
      />
    </React.Fragment>
  );
});

export default function Catalog() {
  const [maxPage, setMaxPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState();
  const increaseMaxPage = React.useCallback(() => {
    setMaxPage(prevMaxPage => prevMaxPage + 1);
  }, [maxPage, setMaxPage])

  const [searchQuery, setSearchQuery] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [isReady ] = useDebounce(
    () => {
      setSearchQuery(inputValue);
      setMaxPage(0);
    },
    1200,
    [inputValue, setSearchQuery]
  );
  const isFetchAndLoadComplete = typeof totalCount !== undefined && isReady();

  const [gray200] = Chakra.useToken("colors", ["gray.200"])
  return (
    <Chakra.Box py={5} position="relative">
      <Chakra.Flex
        justify="center"
        direction="column"
        mb={8}
        py={5}
        position="sticky"
        top={0}
        bg="white"
        zIndex="docked"
        boxShadow={`0px 4px 4px -4px ${gray200}`}
      >
        <Chakra.VStack>
          <Chakra.InputGroup maxW={"xl"}>
            <Chakra.Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for a card..."
              variant="flushed"
              pl={2}
              color="blue.500"
              fontWeight="medium"
              _placeholder={{
                color: "blue.500"
              }}
            />
            <Chakra.InputRightElement>
              {!isFetchAndLoadComplete && (
                <Chakra.Spinner color="blue.500" speed="0.6s" label="Loading" />
              )}
            </Chakra.InputRightElement>
          </Chakra.InputGroup>
          <Chakra.Text>
            {!isFetchAndLoadComplete
              ? "Thinking..."
              : `Found ${totalCount} ${totalCount === 1 ? "card" : "cards"}`}
          </Chakra.Text>
        </Chakra.VStack>
      </Chakra.Flex>
      <Chakra.SimpleGrid
        minChildWidth="240px"
        spacingX={[5]}
        spacingY={[6]}
      >
        {[...Array(maxPage + 1)].map((emptyValue, index) => (
          <CatalogLoader
            key={index}
            currentPage={index}
            maxPage={maxPage}
            searchQuery={searchQuery}
            increaseMaxPage={increaseMaxPage}
            setTotalCount={setTotalCount}
          />
        ))}
      </Chakra.SimpleGrid>
    </Chakra.Box>
  );
}