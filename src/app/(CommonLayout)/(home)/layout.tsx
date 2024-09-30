import NavigateUIModal from "@/src/components/modal/NavigateUIModal";
import { ReactNode } from "react";

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
      {<NavigateUIModal />}
    </>
  );
};

export default HomeLayout;
