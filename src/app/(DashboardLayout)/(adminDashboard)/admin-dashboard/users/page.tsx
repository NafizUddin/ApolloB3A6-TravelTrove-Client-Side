"use client";

import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import { useGetAllUsers, useUpdateRole } from "@/src/hooks/user.hook";
import { useCallback, useState } from "react";
import { IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Chip } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const { user } = useUser();
  const { mutate: handleUpdateRole } = useUpdateRole();
  const { data, refetch } = useGetAllUsers(
    `page=${currentPage}&limit=${dataPerPage}`
  );

  const users = data?.data?.result ?? []; // users Array
  const totalPagesArray = Array.from(
    { length: data?.data?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMakeUser = async (id: string) => {
    toast.loading("Reverting to User...");
    const userData: Partial<IUser> = {
      role: "USER",
    };

    toast.dismiss();

    try {
      handleUpdateRole({ userData, id });
      toast.success("Reverted to User successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMakeAdmin = async (id: string) => {
    toast.loading("Promoting to Admin...");
    const userData: Partial<IUser> = {
      role: "ADMIN",
    };

    toast.dismiss();

    try {
      handleUpdateRole({ userData, id });
      toast.success("Promoted to Admin successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = useCallback(
    (singleUser: IUser, columnKey: React.Key) => {
      const cellValue = singleUser[columnKey as keyof IUser];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: singleUser.profilePhoto }}
              name={cellValue}
              className="font-bold text-xl"
            >
              <span className="text-lg">{singleUser.name}</span>
            </User>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="font-bold text-sm">{cellValue}</p>
            </div>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="font-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={cellValue === "PREMIUM" ? "success" : "warning"}
            >
              <span className="font-bold">{cellValue}</span>
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              {singleUser?.email &&
              user?.email &&
              singleUser.email === user.email ? (
                <button className="bg-purple-600 hover:bg-purple-700 py-1 px-3 rounded-lg cursor-pointer text-white font-bold">
                  Admin
                </button>
              ) : (
                <>
                  {singleUser?.role === "ADMIN" ? (
                    <Button
                      size="sm"
                      onClick={() => handleMakeUser(singleUser?._id)}
                      className="bg-backup hover:bg-[#ad5d07] rounded-lg cursor-pointer text-white font-bold"
                    >
                      Set User
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleMakeAdmin(singleUser?._id)}
                      className="bg-primary hover:bg-primary-800 rounded-lg cursor-pointer text-white font-bold"
                    >
                      Set Admin
                    </Button>
                  )}
                </>
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [user?.email]
  );

  return (
    <div className="my-10 lg:my-0">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="All Users Management"
      />

      <div className="mt-10">
        <div className="overflow-x-auto">
          {users.length > 0 && user ? (
            <Table
              aria-label="Users table with custom cells"
              className="min-w-full"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={
                      column.uid === "name" || column.uid === "email"
                        ? "start"
                        : "center"
                    }
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item: IUser) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table aria-label="Example empty table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
          )}
        </div>
      </div>

      <div>
        {users?.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
