"use client";
import { BasicUserInfo } from "@/src/types/user";
import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  basicUserInfor: BasicUserInfo | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
  basicUserInfor: BasicUserInfo | null;
}

export default function AuthProvider({ children, basicUserInfor }: Props) {
  return (
    <AuthContext.Provider value={{ basicUserInfor }}>
      {children}
    </AuthContext.Provider>
  );
}