import CreatePostModal from "@/src/components/modal/CreatePostModal/CreatePostModal";

const CreatePost = ({ refetch }: { refetch: any }) => {
  return (
    <div>
      <div className="my-7">
        <CreatePostModal refetch={refetch}/>
      </div>
    </div>
  );
};

export default CreatePost;
