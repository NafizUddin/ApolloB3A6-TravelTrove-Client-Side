"use client";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import envConfig from "@/src/config/envConfig";
import { useUser } from "@/src/context/user.provider";
import {
  useGetAllPosts,
  useGetAllPostsInDashboard,
} from "@/src/hooks/post.hook";

const UserDashboardHome = () => {
  const { user } = useUser();

  const { data: individualAllPosts, refetch } = useGetAllPostsInDashboard(
    `postAuthor=${user?._id}`
  );

  console.log(individualAllPosts.data);

  return (
    <div>
      <SectionTitle sub="TIPS & STORIES" heading="MY TRAVEL INSIGHTS" />
    </div>
  );
};

export default UserDashboardHome;
