"use client";

import { useSearchParams } from "next/navigation";
import ProfileLoadingCard from "../(home)/_components/section/ProfileLoadingCard";
import UserProfileCard from "@/src/components/cards/UserProfileCard";
import { useGetSingleUser } from "@/src/hooks/user.hook";

const UserProfilePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  const {
    data: singleUser,
    isLoading: postLoading,
    refetch,
  } = useGetSingleUser(id || "");

  return (
    <div className="my-8 xl:my-10">
      {postLoading ? (
        <ProfileLoadingCard />
      ) : (
        <UserProfileCard otherUser={singleUser?.data} refetch={refetch} />
      )}
    </div>
  );
};

export default UserProfilePage;
