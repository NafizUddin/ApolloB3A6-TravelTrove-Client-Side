"use client";
import { useSearchParams } from "next/navigation";
import { useGetSinglePost } from "../../../hooks/post.hook";
import TravelPostCard from "@/src/app/(CommonLayout)/(home)/_components/section/TravelPostCard";
import LoadingCard from "@/src/app/(CommonLayout)/(home)/_components/section/LoadingCard";

const PostDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: singlePost,
    isLoading: postLoading,
    refetch,
  } = id
    ? useGetSinglePost(id) // TypeScript will infer the type
    : { data: null, isLoading: false };

  return (
    <div className="mt-5">
      {postLoading ? (
        <LoadingCard />
      ) : (
        <TravelPostCard singlePost={singlePost?.data} refetch={refetch} />
      )}
    </div>
  );
};

export default PostDetails;
