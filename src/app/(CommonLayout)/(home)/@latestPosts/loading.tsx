import LoadingCardWithoutComment from "@/src/app/(CommonLayout)/(home)/_components/section/LoadingCardWithoutComment";
import CreatePost from "../_homeSections/CreatePost/CreatePost";

const LatestPostLoading = () => {
  return (
    <div>
      <CreatePost />
      <LoadingCardWithoutComment />
    </div>
  );
};

export default LatestPostLoading;
