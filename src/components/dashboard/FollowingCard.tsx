import { useUnfollowUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";

const FollowingCard = ({ singleUser }: { singleUser: IUser }) => {
  const { _id, name, profilePhoto, postCount, followers, following } =
    singleUser;

  const { mutate: handleUnfollowUser } = useUnfollowUser();

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
  };

  return (
    <div className="relative max-w-xs mx-auto mt-24 break-words bg-white mb-6 shadow-lg rounded-xl border border-primary-400">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <Avatar
                src={profilePhoto}
                className="shadow-xl align-middle border-none w-[150px] h-[150px] text-large absolute -top-16 -right-[80px] object-cover"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {postCount}
                </span>
                <span className="text-sm text-slate-400">Posts</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {followers.length || 0}
                </span>
                <span className="text-sm text-slate-400">Followers</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {following.length || 0}
                </span>
                <span className="text-sm text-slate-400">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            {name}
          </h3>
        </div>
        <div className="py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="px-4">
              <span
                onClick={() => handleRemoveFollow(_id, name)}
                className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700"
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
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingCard;
