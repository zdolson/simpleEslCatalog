import useSWR from "swr";

const BASE_URL = "https://api.elderscrollslegends.io/v1/cards";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCards(page = 0, searchQuery) {
  const { data, error } = useSWR(
    `${BASE_URL}?pageSize=20&page=${page}}${
      searchQuery ? `&name=${searchQuery}` : ""
    }`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
