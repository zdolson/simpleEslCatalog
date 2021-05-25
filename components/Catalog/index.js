import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { useDebounce, useIntersection } from "react-use";

import Card from "./Card";
import SkeletonCatalog from "../Skeletons/Catalog";
import useCards from "../../hooks/useCards";

const CatalogLoader = React.memo(function CatalogLoader({
  currentPage,
  maxPage,
  increaseMaxPage,
  searchQuery,
}) {
  const { data, isLoading, isError } = useCards(currentPage, searchQuery);
  const loadMoreRef = React.useRef();
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

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
        data?.cards.map((card, index) => <Card key={index} data={card} />)}
      <Chakra.Box
        ref={loadMoreRef}
        display={currentPage === maxPage ? "block" : "none"}
      />
    </React.Fragment>
  );
});

export default function Catalog() {
  const [maxPage, setMaxPage] = React.useState(0);
  const increaseMaxPage = React.useCallback(() => {
    // console.log(`Increasing max page from ${maxPage} to ${maxPage+1}`);
    setMaxPage(prevMaxPage => prevMaxPage + 1);
  }, [maxPage, setMaxPage])

  const [searchQuery, setSearchQuery] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [isReady, cancel] = useDebounce(
    () => {
      setSearchQuery(inputValue);
      setMaxPage(0);
    },
    1600,
    [inputValue, setSearchQuery]
  );

  return (
    <Chakra.Box py={5}>
      <Chakra.Flex align="center" mb={8}>
        <Chakra.InputGroup>
          <Chakra.Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for a card"
            variant="flushed"
          />
          <Chakra.InputRightElement>
            {!isReady() && (<Chakra.Spinner color="blue.500" speed="0.6s" label="Loading"/>)}
          </Chakra.InputRightElement>
        </Chakra.InputGroup>
      </Chakra.Flex>
      <Chakra.SimpleGrid
        columns={[1, 2, 3, 4, 5]}
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
          />
        ))}
      </Chakra.SimpleGrid>
    </Chakra.Box>
  );
}