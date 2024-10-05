import { ReactNode } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import "react-quill/dist/quill.snow.css";
import { useUser } from "@/src/context/user.provider";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const travelCategory = [
  { key: "Adventure", label: "Adventure" },
  { key: "Business Travel", label: "Business Travel" },
  { key: "Exploration", label: "Exploration" },
  { key: "Family Travel", label: "Family Travel" },
  { key: "Luxury Travel", label: "Luxury Travel" },
  { key: "Budget Travel", label: "Budget Travel" },
];

interface CreatePostModalBodyProps {
  control: UseFormReturn["control"];
  errors: any;
  content: string;
  setContent: (value: string) => void;
  handleSubmit: any;
  reset: () => void;
  setOpenEditModal: (value: boolean) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  fileName: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearFileSelection: () => void;
  openEditModal: any;
}

const UpdatePostModal = ({
  control,
  errors,
  content,
  setContent,
  handleSubmit,
  reset,
  setOpenEditModal,
  isSelected,
  setIsSelected,
  fileName,
  handleFileChange,
  clearFileSelection,
  openEditModal,
}: CreatePostModalBodyProps) => {
  const { user } = useUser();

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

  return (
    <div
      onClick={() => setOpenEditModal(false)}
      className={`fixed z-[100] w-screen ${
        openEditModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute w-11/12 mx-auto md:max-w-3xl xl:max-w-4xl rounded-lg bg-white p-6 drop-shadow-lg overflow-y-auto h-fit max-h-[90vh] ${
          openEditModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <svg
          onClick={() => setOpenEditModal(false)}
          className="absolute right-4 top-5 w-8 cursor-pointer fill-zinc-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
        </svg>
        <h1 className="mb-2 text-3xl font-semibold">Update Travel Post</h1>
        <div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {user?.isVerified && (
              <div className="mt-7">
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                  Mark as Premium
                </Checkbox>
              </div>
            )}

            <div>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Please provide post title" }}
                render={({ field }) => (
                  <Input {...field} label="Post Title" variant="underlined" />
                )}
              />
              {errors.title && (
                <p className="text-red-500">
                  {errors.title.message as ReactNode}
                </p>
              )}
            </div>

            <div>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Please select a category" }}
                render={({ field }) => (
                  <Select {...field} label="Select a category">
                    {travelCategory.map((category) => (
                      <SelectItem key={category.key}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500">
                  {errors.category.message as ReactNode}
                </p>
              )}
            </div>

            <div>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Please provide post description" }}
                render={({ field }) => (
                  <div className="w-full space-y-3">
                    <label className="font-semibold">Post Description</label>
                    <ReactQuill
                      {...field}
                      value={content}
                      onChange={(value) => {
                        setContent(value);
                        field.onChange(value);
                      }}
                      modules={modules}
                      className="h-[110px]"
                    />
                  </div>
                )}
              />
              {errors.description && (
                <p className="text-red-500 mt-12">
                  {errors.description.message as ReactNode}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="mt-9">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 text-default-800 shadow-sm transition-all duration-100 hover:border-primary-600"
                  htmlFor={"image"}
                >
                  {"Upload Post Image"}
                </label>
              </div>
              <input
                accept="image/*"
                className="hidden"
                id={"image"}
                type="file"
                onChange={handleFileChange}
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

              {!fileName && errors.image && (
                <p className="mt-1 text-sm text-red-600 text-center">
                  {errors.image.message as ReactNode}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 w-full py-[6px] text-white hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>

              <div className="flex-1">
                <button
                  onClick={() => {
                    reset();
                    setOpenEditModal(false);
                  }}
                  className="rounded-md border border-rose-600 w-full py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostModal;
