"use client";
import dynamic from "next/dynamic";
import TRModal from "./TRModal";
import "react-quill/dist/quill.snow.css";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TestModal = () => {
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const handleContentChange = (value: any) => {
    setContent(value);
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
      ],
    },
  };

  const handleCreatePost = () => {};

  return (
    <div className="my-6">
      <TRModal
        buttonClassName="flex-1 bg-primary text-white"
        buttonText="Claim Request"
        title="Create Travel Post"
      >
        {
          <div>
            <form
              onSubmit={handleSubmit(handleCreatePost)}
              className="space-y-8"
            >
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Please provide post title",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-backup outline-none invalid:border-red-400 transition"
                  placeholder="Enter Post Title"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.userEmail?.message as ReactNode}
                </p>
              </div>
            </form>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={modules}
            />
          </div>
        }
      </TRModal>
    </div>
  );
};

export default TestModal;
