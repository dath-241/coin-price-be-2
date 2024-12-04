import Container from "@/src/components/Container";
import PrivateNavbar from "@/src/layouts/Navbar";
import { H1 } from "../../components/Heading";
import FlexBox from "../../components/FlexBox";
import UserList from "../../views/UserList";
import { User } from "../../types";
import Searchbar from "../../views/Searchbar";
import NavLink from "../../layouts/NavLink";
import axios from "axios";

interface PageProps {
  searchParams: SearchParams;
}

export default async function UserManagementPage({ searchParams }: PageProps) {
  const { field, value } = searchParams;
  let userList = await fetchUserList();

  if (field && value) {
    const filteredUserList = userList.filter((user) => {
      const userValue = user[field as keyof User] as string;

      if (typeof userValue !== "string") return false;

      return userValue.toLowerCase().includes(value.toLowerCase());
    });
    userList = filteredUserList;
  }

  return (
    <Container className="bg-[#DCF0FF] py-16">
      <PrivateNavbar />
      <NavLink />
      <FlexBox className="w-9/12 mb-8">
        <H1 className="text-3xl font-bold text-center">Quản lý người dùng</H1>
      </FlexBox>

      <Searchbar basePath="user" searchParams={searchParams} />

      <FlexBox className="w-9/12 mt-4">
        <UserList userList={userList} />
      </FlexBox>
    </Container>
  );
}
async function fetchUserList() {
  const url = "https://dath.hcmutssps.id.vn/admin/getAllUser";
  const token = process.env.adminToken;

  try {
    const response = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    return response.data as User[];
  } catch (error: any) {
    console.error(error.data);
    return [];
  }
}
