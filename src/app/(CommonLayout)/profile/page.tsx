"use client";

import { useUser } from "@/src/context/user.provider";
import ProfileCard from "./_profileCard/ProfileCard";
import ProfileLoadingCard from "@/src/app/(CommonLayout)/(home)/_components/section/ProfileLoadingCard";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="my-8 xl:my-10">
      {user ? <ProfileCard user={user} /> : <ProfileLoadingCard />}{" "}
    </div>
  );
};

export default Profile;
