"use client";

import { createContext, useContext } from "react";

export type Role = "Admin" | "User";

export const RoleContext = createContext<{
  role: Role;
  setRole: (role: Role) => void;
} | null>(null);

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};
