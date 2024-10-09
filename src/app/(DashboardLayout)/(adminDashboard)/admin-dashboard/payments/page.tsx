"use client";
import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";

const PaymentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;
  const { data } = useGetAllUsers(
    `status=PREMIUM&role=USER&page=${currentPage}&limit=${dataPerPage}`
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

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "PLAN", uid: "userStatus" },
    { name: "START DATE", uid: "startDate" },
    { name: "END DATE", uid: "endDate" },
    { name: "CHARGE", uid: "charge" },
    { name: "PAYMENT STATUS", uid: "paymentStatus" },
  ];

  const renderCell = useCallback((singleUser: IUser, columnKey: React.Key) => {
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
      case "userStatus":
        return (
          <Chip className="capitalize" size="sm" variant="flat" color="primary">
            <span className="font-bold">{singleUser?.status}</span>
          </Chip>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">
              {singleUser?.premiumStart}
            </p>
          </div>
        );
      case "endDate":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">
              {singleUser?.premiumEnd}
            </p>
          </div>
        );
      case "charge":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize ml-2">
              $ {singleUser?.premiumCharge}
            </p>
          </div>
        );
      case "paymentStatus":
        return (
          <Chip
            className="capitalize"
            size="sm"
            variant="flat"
            color={"success"}
          >
            <span className="font-bold">{singleUser?.paymentStatus}</span>
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="my-10 lg:my-5">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Payment Management"
      />

      <div className="mt-10">
        <div className="overflow-x-auto">
          {users.length > 0 ? (
            <Table
              aria-label="Users table with custom cells"
              className="min-w-full"
            >
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
      </div>

      <div>
        {users?.length > 0 && (
          <div className="flex justify-center items-center mt-8">
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

export default PaymentManagement;
