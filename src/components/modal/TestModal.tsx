"use client";
import dynamic from "next/dynamic";
import TRModal from "./TRModal";
import "react-quill/dist/quill.snow.css";
import { ReactNode, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TestModal = () => {
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const clearFileSelection = () => {
    setFileName("");
  };

  const handleCreatePost: SubmitHandler<FieldValues> = (data) => {
    setIsSubmitting(true); // Set loading state
    console.log("Form Data:", data);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Perform any action after successful submission
      // e.g., Close modal if required
      if (formRef.current) {
        formRef.current.onClose(); // Close the modal when form is valid and submission is successful
      }
    }, 2000);
  };

  return (
    <div className="my-6">
      <TRModal
        buttonClassName="flex-1 bg-primary text-white"
        buttonText="Claim Request"
        title="Create Travel Post"
        onAction={(onClose) => {
          if (formRef.current) {
            handleSubmit((data) => {
              handleCreatePost(data);
              onClose(); // Call onClose if the form submission is successful
            })(); // Trigger react-hook-form validation and submission
          }
        }}
        isSubmitting={isSubmitting}
      >
        {
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit(handleCreatePost)}
              className="space-y-8"
            >
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-700 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Please provide post title",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-primary outline-none invalid:border-red-400 transition"
                  placeholder="Enter Post Title"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.userEmail?.message as ReactNode}
                </p>
              </div>

              <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-700 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full bg-transparent pb-3  border-b border-primary outline-none invalid:border-red-400 transition"
                    >
                      <option value="">Select Travel Category</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Business Travel">Business Travel</option>
                      <option value="Exploration">Exploration</option>
                      <option value="Family Travel">Family Travel</option>
                      <option value="Luxury Travel">Luxury Travel</option>
                      <option value="Budget Travel">Budget Travel</option>
                    </select>
                  )}
                />
              </div>

              <div className="w-full space-y-3">
                <label htmlFor="description" className="font-semibold">
                  Post Description
                </label>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary text-default-800 shadow-sm transition-all duration-100 hover:border-primary-700"
                  htmlFor="image"
                >
                  Upload Post Image
                </label>
                <input
                  accept="image/*"
                  className="hidden"
                  id="image"
                  type="file"
                  {...register("image")}
                />
                {fileName && (
                  <div className="mt-2 flex items-center text-sm text-gray-600 justify-between">
                    <span
                      className="font-medium mr-2 truncate w-60"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Selected file: {fileName}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-medium"
                      onClick={clearFileSelection}
                    >
                      Clear
                    </button>
                  </div>
                )}

                {!fileName && errors["image"] && (
                  <p className="mt-1 text-sm text-red-600 text-center">
                    {errors["image"].message as ReactNode}
                  </p>
                )}
              </div>
            </form>
          </div>
        }
      </TRModal>
    </div>
  );
};

export default TestModal;
