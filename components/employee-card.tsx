"use client"

import { Pencil, Trash2, Mail, Phone } from "lucide-react"
import type { Employee } from "@/lib/types"
import { StatusBadge } from "./status-badge"
import styles from "./employee-card.module.css"

interface EmployeeCardProps {
  employee: Employee
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

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.avatar} aria-hidden="true">
          {initials(employee.name)}
        </span>
        <div className={styles.identity}>
          <h3 className={styles.name}>{employee.name}</h3>
          <span className={styles.position}>{employee.position}</span>
        </div>
        <StatusBadge status={employee.status} />
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt>
            <Mail size={15} aria-hidden="true" /> Email
          </dt>
          <dd>{employee.email}</dd>
        </div>
        <div className={styles.metaRow}>
          <dt>
            <Phone size={15} aria-hidden="true" /> Phone
          </dt>
          <dd>{employee.phone}</dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Department</dt>
          <dd>
            <span className={styles.deptTag}>{employee.department}</span>
          </dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(employee)}
          aria-label={`Edit ${employee.name}`}
        >
          <Pencil size={16} aria-hidden="true" /> Edit
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(employee)}
          aria-label={`Delete ${employee.name}`}
        >
          <Trash2 size={16} aria-hidden="true" /> Delete
        </button>
      </div>
    </article>
  )
}
