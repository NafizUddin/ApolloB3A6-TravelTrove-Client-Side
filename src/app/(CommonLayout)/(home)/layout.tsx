import CreatePostModal from "@/src/components/modal/CreatePostModal";
import { ReactNode } from "react";
import CreatePost from "./_homeSections/CreatePost/CreatePost";

const HomeLayout = ({
  children,
  latestPosts,
}: {
  children: ReactNode;
  latestPosts: ReactNode;
}) => {
  return (
    <>
      {children}
      {latestPosts}
    </>
  );
};

export default HomeLayout;
