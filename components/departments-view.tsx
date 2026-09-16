"use client"

import { Building2, Users } from "lucide-react"
import type { Employee } from "@/lib/types"
import { DEPARTMENTS } from "@/lib/types"
import styles from "./departments-view.module.css"

interface DepartmentsViewProps {
  employees: Employee[]
  onOpenDepartment: (department: string) => void
}

export function DepartmentsView({
  employees,
  onOpenDepartment,
}: DepartmentsViewProps) {
  return (
    <div className={styles.grid}>
      {DEPARTMENTS.map((dept) => {
        const members = employees.filter((e) => e.department === dept)
        const active = members.filter((e) => e.status === "Active").length
        return (
          <button
            key={dept}
            className={styles.card}
            onClick={() => onOpenDepartment(dept)}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <Building2 size={22} />
            </div>
            <h3 className={styles.name}>{dept}</h3>
            <div className={styles.stats}>
              <span className={styles.stat}>
                <Users size={15} aria-hidden="true" />
                {members.length} {members.length === 1 ? "member" : "members"}
              </span>
              <span className={styles.active}>{active} active</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
