"use client";

import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import { useGetAllUsers } from "@/src/hooks/user.hook";
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
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Pagination } from "@nextui-org/pagination";

const UsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const { user } = useUser();

  const { data } = useGetAllUsers(`page=${currentPage}&limit=${dataPerPage}`);

  const users = data?.data?.result ?? []; // users Array

  const totalPagesArray = Array.from(
    { length: data?.data?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMakeUser = async (id: string) => {};

  const handleMakeAdmin = async (id: string) => {};

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "PLAN", uid: "plan" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const statusColorMap = {
    BASIC: "success",
    PREMIUM: "warning",
  };

  const renderCell = useCallback((user: IUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profilePhoto }}
            description={user.email}
            name={cellValue}
            className="font-bold text-xl"
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="All Users Management"
      />

      <div className="mt-10">
        {users.length > 0 ? (
          <Table aria-label="Users table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
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
