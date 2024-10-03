"use client";

import { ProfileEditModal } from "@/src/components/modal/ProfileEditModal/ProfileEditModal";
import VerifyModal from "@/src/components/modal/VerifyProfileModal/VerifyModal";
import { IUser } from "@/src/types";
import { useState } from "react";

export default function ProfileCard({ user }: { user: IUser }) {
  const {
    _id,
    name,
    role,
    email,
    status,
    profilePhoto,
    followers,
    following,
    totalUpvote,
    isVerified,
    postCount,
  } = user;

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openVerifyProfileModal, setOpenVerifyProfileModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative sm:w-[350px]">
        <img
          className="h-full md:w-full scale-105 transform rounded-lg bg-black/70"
          src={profilePhoto}
          alt="user photo"
        />
      </div>
      <div className="w-full md:min-w-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] md:w-[400px]">
        <div className="space-y-1">
          <h2 className="text-center flex justify-center items-center text-2xl font-medium text-gray-700 lg:text-3xl">
            <span>{name}</span>
            <span>
              {isVerified && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
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
          </h2>

          <p className="text-gray-500">{email}</p>
          <div className="py-2">
            <span className="rounded-full border-2 border-primary px-3 py-1 text-xs font-semibold text-primary">
              {status} PLAN
            </span>
          </div>
          {!isVerified && totalUpvote > 0 && (
            <div
              onClick={() => {
                setOpenVerifyProfileModal(true);
              }}
              className="flex gap-1 justify-center items-center cursor-pointer"
            >
              <span className="underline font-medium">GET VERIFIED</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Posts</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {postCount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Following</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {following?.length || 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Followers</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {followers?.length || 0}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setOpenEditProfileModal(true);
            }}
            className="rounded-full border-2 border-primary px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white  duration-300 font-semibold"
          >
            EDIT PROFILE
          </button>
        </div>

        {openEditProfileModal && (
          <ProfileEditModal
            user={user}
            openModal={openEditProfileModal}
            setOpenModal={setOpenEditProfileModal}
          />
        )}

        {openVerifyProfileModal && (
          <VerifyModal
            user={user}
            openModal={openVerifyProfileModal}
            setOpenModal={setOpenVerifyProfileModal}
          />
        )}
      </div>
    </div>
  );
}
