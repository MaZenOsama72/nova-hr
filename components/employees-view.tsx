"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import type { Employee } from "@/lib/types"
import { EmployeeToolbar, type StatusFilter } from "./employee-toolbar"
import { EmployeeTable } from "./employee-table"
import { EmptyState } from "./empty-state"
import styles from "./employees-view.module.css"

interface EmployeesViewProps {
  employees: Employee[]
  initialDepartment?: string
  initialQuery?: string
  onAdd: () => void
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export function EmployeesView({
  employees,
  initialDepartment = "All",
  initialQuery = "",
  onAdd,
  onEdit,
  onDelete,
}: EmployeesViewProps) {
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState<StatusFilter>("All")
  const [department, setDepartment] = useState(initialDepartment)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return employees.filter((emp) => {
      if (status !== "All" && emp.status !== status) return false
      if (department !== "All" && emp.department !== department) return false
      if (!q) return true
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.position.toLowerCase().includes(q)
      )
    })
  }, [employees, query, status, department])

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <p className={styles.count}>
          <strong>{filtered.length}</strong> of {employees.length} employees
        </p>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} aria-hidden="true" /> Add Employee
        </button>
      </div>

      <EmployeeToolbar
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        department={department}
        onDepartmentChange={setDepartment}
      />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <EmployeeTable
          employees={filtered}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}
