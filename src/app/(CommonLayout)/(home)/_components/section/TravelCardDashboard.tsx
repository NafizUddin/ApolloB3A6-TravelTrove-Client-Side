"use client";
import { DeletePostModal } from "@/src/components/modal/DeletePostModal/DeletePostModal";
import { useDeletePost } from "@/src/hooks/post.hook";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ITravelPostCardProps {
  singlePost: any;
  refetch: any;
}

const TravelCardDashboard = ({ singlePost, refetch }: ITravelPostCardProps) => {
  const { _id, title, image, postAuthor, createdAt } = singlePost;

  const router = useRouter();
  const params = new URLSearchParams();
  params.set("id", _id);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: handlePostDelete } = useDeletePost();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleDeletePost = async () => {
    handlePostDelete({ id: _id, authorId: postAuthor?._id });
    refetch();
  };

  return (
    <div>
      <Card className="py-4 relative flex flex-col h-full">
        <CardHeader className="pb-0 pt-2 px-4">
          <div className="flex">
            <div className="flex gap-2 items-start">
              <Avatar
                src={postAuthor?.profilePhoto}
                size="sm"
                className="object-cover"
              />
              <div>
                <div className="flex items-center">
                  <p className="text-tiny uppercase font-bold">
                    {postAuthor?.name}
                  </p>
                  <span>
                    {postAuthor?.isVerified && (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#1773aa"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-badge-check"
                        >
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>

                <small className="text-default-500">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
            <div className="mb-5 cursor-pointer w-20">
              <Dropdown closeOnSelect={true}>
                <DropdownTrigger className="absolute top-3 right-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1773aa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-ellipsis"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="view"
                    onClick={() =>
                      handleNavigation(`/postDetails?${params.toString()}`)
                    }
                  >
                    <span className="flex gap-2 items-center text-primary">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1773aa"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-eye"
                        >
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </span>
                      <span>View Post</span>
                    </span>
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDeleteModal(true);
                      }}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </span>
                      <span>Delete Post</span>
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>
        <h4 className="font-bold text-large flex-grow flex-shrink-0 flex-basis-0 px-4">
          {title}
        </h4>
        <CardBody className="overflow-visible py-2 w-full">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src={image}
            width={320}
            height={165}
          />
        </CardBody>
      </Card>

      {openDeleteModal && (
        <DeletePostModal
          handleDeletePost={handleDeletePost}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default TravelCardDashboard;
