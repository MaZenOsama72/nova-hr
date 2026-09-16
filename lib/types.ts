export type EmployeeStatus = "Active" | "On Leave" | "Inactive"

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  status: EmployeeStatus
}

export const DEPARTMENTS = [
  "IT",
  "Marketing",
  "HR",
  "Finance",
  "Sales",
  "Operations",
] as const

export const STATUSES: EmployeeStatus[] = ["Active", "On Leave", "Inactive"]
