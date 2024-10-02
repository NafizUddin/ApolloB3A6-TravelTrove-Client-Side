"use client";
import TravelPostCard from "@/src/components/ui/section/TravelPostCard";
import envConfig from "@/src/config/envConfig";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key, useEffect, useState } from "react";

const NewsFeed = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(""); // 'upvote' or 'downvote'
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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

  const apiUrl = `${envConfig.baseApi}/posts?${new URLSearchParams({
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(category && { category }),
    ...(sort && { sort }),
  }).toString()}`;

  const { data: filteredPosts, isLoading: postLoading } =
    useGetAllPosts(apiUrl);

  const handleCategorySelect = (key: Key) => {
    setCategory(String(key));
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
  };

  //   console.log(allPosts);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 p-4 border rounded-md shadow">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-xl border-2 border-primary bg-white py-[6px] px-6 text-base font-medium  outline-none focus:border-primary focus:ring-1 focus:ring-primary-300"
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
        <div className="border mt-4 p-4 rounded flex gap-3 items-center">
          <p className="font-semibold">Filtered By:</p>
          <div className="flex flex-wrap gap-2">
            {debouncedSearchTerm && (
              <span className="bg-gray-200 px-2 py-1 rounded">
                {debouncedSearchTerm}
              </span>
            )}
            {category && (
              <span className="bg-gray-200 px-2 py-1 rounded">{category}</span>
            )}
            {sort && (
              <span className="bg-gray-200 px-2 py-1 rounded">{sort}</span>
            )}
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => {
                setSearchInput("");
                setCategory("");
                setSort("");
                setFilterApplied(false);
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <div className="my-10">
        {filteredPosts?.data?.result &&
          filteredPosts?.data?.result?.map(
            (singlePost: IPost, index: number) => (
              <TravelPostCard key={index} singlePost={singlePost} />
            )
          )}
      </div>
    </div>
  );
};

export default NewsFeed;
