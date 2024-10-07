"use client";
import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import StatCardLoading from "@/src/app/(CommonLayout)/(home)/_components/section/StatCardLoading";
import { useGetAllPostsInDashboard } from "@/src/hooks/post.hook";
import { useGetAllUsers } from "@/src/hooks/user.hook";

const AdminDashboardHome = () => {
  const { data: AllUsers, isLoading: allUsersLoading } = useGetAllUsers();
  const { data: PremiumUsers, isLoading: premiumUsersLoading } = useGetAllUsers(
    `status=PREMIUM&role=USER`
  );
  const { data: AllPosts, isLoading: allPostsLoading } =
    useGetAllPostsInDashboard();

  const allUsersCount = AllUsers?.data?.meta?.total;
  const premiumUsersCount = PremiumUsers?.data?.meta?.total;
  const allPostsCount = AllPosts?.meta?.totalPage;

  return (
    <div>
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Website Overview"
      />

      {/* Stat Card Section */}
      <div>
        {allUsersLoading || allPostsLoading || premiumUsersLoading ? (
          <StatCardLoading />
        ) : (
          <div className="flex flex-col md:flex-row justify-center my-7">
            <div className="flex md:flex-row space-x-8">
              <div className="shadow-md p-4">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-56">
                    <div>
                      <div className="uppercase text-sm text-gray-400">
                        Total Users
                      </div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">35</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg
                        className="h-16 w-20 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-md p-4">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-56">
                    <div>
                      <div className="uppercase text-sm text-gray-400">
                        Total Posts
                      </div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">30,000</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg
                        fill="#D1D5DB"
                        height="64px"
                        width="80px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 28.048 28.048"
                        xmlSpace="preserve"
                        stroke="#d8d5d5"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path d="M25.818,0.433H2.229C0.995,0.433,0,1.451,0,2.699v22.654c0,1.25,0.995,2.262,2.229,2.262h23.589 c1.229,0,2.23-1.012,2.23-2.262V2.699C28.049,1.451,27.047,0.433,25.818,0.433z M3.642,2.06h20.765 c1.082,0,1.963,0.895,1.963,1.994V8.54H1.678V4.054C1.678,2.954,2.554,2.06,3.642,2.06z M18.979,10.796v15.193H8.911V10.796H18.979 z M1.678,23.995V10.796h5.06v15.193H3.642C2.554,25.99,1.678,25.097,1.678,23.995z M24.406,25.99h-3.251V10.796h5.214v13.199 C26.369,25.097,25.488,25.99,24.406,25.99z"></path>{" "}
                            <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                            <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                            <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-md p-4">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-56">
                    <div>
                      <div className="uppercase text-sm text-gray-400">
                        Premium Users
                      </div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">30,000</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg
                        className="h-16 w-20 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
