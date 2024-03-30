"use client";

import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/client-side/user-current-role";
import { FormError } from "@/components/auth/formError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return (
    <>
      {children}
    </>
  );
};