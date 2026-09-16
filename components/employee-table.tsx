"use client"

import { Pencil, Trash2 } from "lucide-react"
import type { Employee } from "@/lib/types"
import { StatusBadge } from "./status-badge"
import { EmployeeCard } from "./employee-card"
import styles from "./employee-table.module.css"

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <>
      {/* Desktop / tablet table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Position</th>
              <th scope="col">Status</th>
              <th scope="col" className={styles.actionsCol}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className={styles.employeeCell}>
                    <span className={styles.avatar} aria-hidden="true">
                      {initials(emp.name)}
                    </span>
                    <span className={styles.name}>{emp.name}</span>
                  </div>
                </td>
                <td className={styles.muted}>{emp.email}</td>
                <td>
                  <span className={styles.deptTag}>{emp.department}</span>
                </td>
                <td className={styles.muted}>{emp.position}</td>
                <td>
                  <StatusBadge status={emp.status} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconBtn}
                      onClick={() => onEdit(emp)}
                      aria-label={`Edit ${emp.name}`}
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <button
                      className={`${styles.iconBtn} ${styles.danger}`}
                      onClick={() => onDelete(emp)}
                      aria-label={`Delete ${emp.name}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className={styles.cardList}>
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  )
}
