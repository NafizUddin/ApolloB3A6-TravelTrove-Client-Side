import { useState, useEffect } from "react";
import envConfig from "../config/envConfig";
import { useGetAllPosts } from "../hooks/post.hook";

const useFetchPosts = (
  debouncedSearchTerm: string,
  category: string,
  sort: string
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Construct the API URL based on parameters
  const apiUrl = `${envConfig.baseApi}/posts?${new URLSearchParams({
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(category && { category }),
    ...(sort && { sort }),
    page: currentPage.toString(),
  }).toString()}`;

  const { data } = useGetAllPosts(apiUrl); // Using your custom hook here

  // Update the posts whenever the data changes
  useEffect(() => {
    if (data?.result?.length > 0) {
      setPosts((prev) => [...prev, ...data.result]);
      setHasMore(data.result.length > 0);
    } else {
      setHasMore(false); // No more posts to fetch
    }
  }, [data]);

  return { posts, hasMore, setCurrentPage };
};

export default useFetchPosts;
