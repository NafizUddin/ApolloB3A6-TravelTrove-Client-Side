"use client";

import Image from "next/image";
import { useState } from "react";

const PostCard = () => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<string[]>([
    "This is a demo comment.",
  ]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setCommentsList([...commentsList, comment]);
      setComment("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-8">
      <Image
        src="https://media.nomadicmatt.com/2022/panamacityguide2.jpeg"
        alt="Beautiful view"
        width={600}
        height={400}
        className="rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold">The Girl from Ipanema</h2>
      <p className="text-gray-600 mb-4">Mar 25, 2023 - 1 min</p>
      <p className="text-gray-700 mb-4">
        Create a blog post subtitle that summarizes your post in a few short,
        punchy sentences and entices your audience to continue reading....
      </p>
      <div className="flex items-center mb-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Like
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Dislike
        </button>
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="border rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Submit
        </button>
      </form>
      <div>
        {commentsList.map((cmt, index) => (
          <div key={index} className="border-b py-2">
            <span className="font-semibold">User:</span> <span>{cmt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
