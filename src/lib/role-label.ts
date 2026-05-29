import type { UserRole } from "@/types/auth";

export function roleLabel(role: UserRole): string {
  return role === "admin" ? "Admin" : "Member";
}
