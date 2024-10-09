/* eslint-disable jsx-a11y/img-redundant-alt */
import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";

const UserProfileCard = ({
  otherUser,
  refetch,
}: {
  otherUser: IUser;
  refetch: any;
}) => {
  const {
    _id,
    name,
    email,
    status,
    profilePhoto,
    followers,
    following,
    isVerified,
    postCount,
  } = otherUser;

  const { user } = useUser();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnfollowUser } = useUnfollowUser();

  const handleAddFollow = (id: string, name: string) => {
    handleFollowUser({ id, name });
    refetch();
  };

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
    refetch();
  };

  console.log(user?.following);

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative sm:w-[350px]">
        <img
          className="h-full w-[95%] mx-auto lg:h-[380px] xl:h-[420px] md:w-full scale-105 transform rounded-lg bg-black/70 object-cover"
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
          <div className="flex justify-center items-center">
            {user && followers?.includes(user?._id) ? (
              <button
                onClick={() => handleRemoveFollow(_id, name)}
                className="rounded-full border-2 border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white  duration-300 flex justify-center items-center gap-1 font-bold"
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
                    className="lucide lucide-user-x"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="17" x2="22" y1="8" y2="13" />
                    <line x1="22" x2="17" y1="8" y2="13" />
                  </svg>
                </span>
                <span className="md:block">Unfollow</span>
              </button>
            ) : (
              <button
                onClick={() => handleAddFollow(_id, name)}
                className="rounded-full border-2 border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white  duration-300 flex justify-center items-center gap-1 font-bold"
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
                    className="lucide lucide-user-plus"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                </span>
                <span className="md:block">Follow</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
