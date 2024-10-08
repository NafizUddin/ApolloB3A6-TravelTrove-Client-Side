"use client";

import envConfig from "@/src/config/envConfig";
import { IPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key, useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import CreatePost from "../_homeSections/CreatePost/CreatePost";
import LoadingCardWithoutComment from "@/src/app/(CommonLayout)/(home)/_components/section/LoadingCardWithoutComment";
import TravelPostCardWithoutComment from "@/src/app/(CommonLayout)/(home)/_components/section/TravelPostCardWithoutComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPostsNewsFeed } from "@/src/services/PostServices";
import { useGetAllPosts } from "@/src/hooks/post.hook";

const NewsFeed = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]); // To store all fetched posts
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Debounce implementation using setTimeout for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Determine if filter is applied
  useEffect(() => {
    if (searchInput || category || sort) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [searchInput, category, sort]);

  const { data, isLoading } = useGetAllPosts(
    `${envConfig.baseApi}/posts?${new URLSearchParams({
      ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
      ...(category && { category }),
      ...(sort && { sort }),
      page: page.toString(),
    }).toString()}`
  );

  useEffect(() => {
    if (data?.result) {
      console.log("API Response:", data);
      if (page === 1) {
        setPosts(data.result);
      } else {
        setPosts((prev) => [...prev, ...data.result]);
      }
      setHasMore(data.result.length > 0);
    }
  }, [data, page]);

  const handleCategorySelect = (key: Key) => {
    setCategory(String(key));
    setPage(1);
    setPosts([]);
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
    setPage(1); // Reset page to 1 when sort changes
    setPosts([]); // Clear posts when filter changes
  };

  return (
    <div>
      <CreatePost refetch={() => setPage(1)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 p-4 border rounded-md border-primary shadow md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-xl border-2 border-primary bg-white py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary-300"
        />

        {/* Category filter part */}
        <div className="w-full">
          <Dropdown>
            <DropdownTrigger className="w-full">
              <Button color="primary" variant="bordered" className="capitalize">
                {category || "Select Travel Category"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Travel Category"
              color="primary"
              variant="bordered"
              onAction={handleCategorySelect}
            >
              <DropdownItem key="Adventure">Adventure</DropdownItem>
              <DropdownItem key="Business Travel">Business Travel</DropdownItem>
              <DropdownItem key="Exploration">Exploration</DropdownItem>
              <DropdownItem key="Luxury Travel">Luxury Travel</DropdownItem>
              <DropdownItem key="Family Travel">Family Travel</DropdownItem>
              <DropdownItem key="Budget Travel">Budget Travel</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Sorting part */}
        <div className="w-full">
          <Dropdown>
            <DropdownTrigger className="w-full">
              <Button color="primary" variant="bordered" className="capitalize">
                {sort ? `Sort by ${sort}` : "Sort by"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort Posts"
              color="primary"
              variant="bordered"
              onAction={handleSortSelect} // Handle sort selection
            >
              <DropdownItem key="upvote">Sort by Highest Upvote</DropdownItem>
              <DropdownItem key="downvote">
                Sort by Highest Downvote
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {filterApplied && (
        <div className="border mt-4 p-4 flex gap-3 items-center md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto rounded-md shadow">
          <p className="font-semibold">Filtered By:</p>
          <div
            onClick={() => setSearchInput("")}
            className="flex flex-wrap gap-2"
          >
            {debouncedSearchTerm && (
              <span className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center">
                <span>{debouncedSearchTerm}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {category && (
              <span
                onClick={() => setCategory("")}
                className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center"
              >
                <span>{category}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {sort && (
              <span
                onClick={() => setSort("")}
                className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center"
              >
                <span>{sort}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            <button
              className="bg-gray-200 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => {
                setSearchInput("");
                setCategory("");
                setSort("");
                setFilterApplied(false);
                setPage(1); // Reset page to 1 when clearing filters
                setPosts([]); // Clear posts when filters are cleared
              }}
            >
              <span>
                <BiFilterAlt className="text-lg" />
              </span>
              <span>Clear All</span>
            </button>
          </div>
        </div>
      )}

      <div className="my-10">
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          loader={<LoadingCardWithoutComment />}
          endMessage={
            !hasMore && (
              <p
                className="text-2xl font-bold capitalize"
                style={{ textAlign: "center" }}
              >
                <b>No more posts to load</b>
              </p>
            )
          }
        >
          {posts.length > 0 ? (
            <div>
              {posts.map((singlePost: IPost, index: number) => (
                <TravelPostCardWithoutComment
                  key={index}
                  singlePost={singlePost}
                />
              ))}
            </div>
          ) : (
            !hasMore && <p className="text-center">No posts available</p>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default NewsFeed;
