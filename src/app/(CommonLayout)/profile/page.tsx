"use client";

import { useUser } from "@/src/context/user.provider";
import ProfileCard from "./_profileCard/ProfileCard";

const Profile = () => {
  const { user } = useUser();

  return <div className="my-12">{user && <ProfileCard user={user} />}</div>;
};

export default Profile;
