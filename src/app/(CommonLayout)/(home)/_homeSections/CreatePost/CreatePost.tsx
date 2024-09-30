import CreatePostModal from "@/src/components/modal/CreatePostModal";
import SectionTitle from "@/src/components/ui/section/SectionTitle";

const CreatePost = () => {
  return (
    <div className="my-16">
      <SectionTitle sub="TRAVEL TALES" heading="SHARE YOUR STORIES" />

      <div className="my-7">
        <CreatePostModal />
      </div>
    </div>
  );
};

export default CreatePost;
