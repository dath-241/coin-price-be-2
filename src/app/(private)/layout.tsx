import AuthProvider from "@/src/provider/AuthProvider";
import { fetchInfo } from "@/src/libs/serverFetch";
import PrivateNavbar from "@/src/layouts/private_page/Navbar";

interface Props {
  children: React.ReactNode;
}

export default async function layouts({ children }: Props) {
  const res = await fetchInfo();
  return (
    <AuthProvider basicUserInfor={res.data}>
      <PrivateNavbar />
      {children}
    </AuthProvider>
  );
}
