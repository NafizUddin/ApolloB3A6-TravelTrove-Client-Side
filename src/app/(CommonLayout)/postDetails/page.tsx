"use client";
import { useSearchParams } from "next/navigation";
import { useGetSinglePost } from "../../../hooks/post.hook";
import TravelPostCard from "@/src/components/ui/section/TravelPostCard";
import LoadingCard from "@/src/components/ui/section/LoadingCard";

const PostDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: singlePost, isLoading: postLoading } = id
    ? useGetSinglePost(id) // TypeScript will infer the type
    : { data: null, isLoading: false };

  return (
    <div className="mt-5">
      {postLoading ? (
        <LoadingCard />
      ) : (
        <TravelPostCard singlePost={singlePost?.data} />
      )}
    </div>
  );
};

export default PostDetails;
