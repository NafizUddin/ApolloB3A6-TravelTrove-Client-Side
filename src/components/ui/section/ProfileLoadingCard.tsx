const ProfileLoadingCard = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative sm:w-[350px]">
        <div className="h-[350px] w-[350px] scale-105 transform rounded-lg bg-gray-300 animate-pulse"></div>
      </div>
      <div className="min-w-[250px] max-w-[450px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] md:w-[350px]">
        <div className="space-y-1">
          <div className="flex justify-center gap-2 items-center">
            <div className="h-8 w-36 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="h-4 w-48 bg-gray-300 animate-pulse rounded"></div>
          <div className="py-2">
            <div className="h-6 w-24 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <div className="h-6 w-36 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <div className="h-4 w-12 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 w-12 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 w-12 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
        <div>
          <div className="h-10 w-32 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingCard;
