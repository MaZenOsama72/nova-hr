"use client"

import { Users, UserCheck, CalendarClock, Building2, ArrowRight } from "lucide-react"
import type { Employee } from "@/lib/types"
import { DEPARTMENTS } from "@/lib/types"
import { StatCard } from "./stat-card"
import { StatusBadge } from "./status-badge"
import styles from "./dashboard-view.module.css"

interface DashboardViewProps {
  employees: Employee[]
  onViewAll: () => void
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function DashboardView({ employees, onViewAll }: DashboardViewProps) {
  const total = employees.length
  const active = employees.filter((e) => e.status === "Active").length
  const onLeave = employees.filter((e) => e.status === "On Leave").length
  const activeDepts = new Set(employees.map((e) => e.department)).size

  const deptCounts = DEPARTMENTS.map((dept) => ({
    dept,
    count: employees.filter((e) => e.department === dept).length,
  })).filter((d) => d.count > 0)

  const maxCount = Math.max(1, ...deptCounts.map((d) => d.count))
  const recent = employees.slice(0, 5)

  return (
    <div className={styles.wrap}>
      <section className={styles.stats}>
        <StatCard label="Total Employees" value={total} icon={Users} tone="primary" />
        <StatCard label="Active" value={active} icon={UserCheck} tone="success" />
        <StatCard label="On Leave" value={onLeave} icon={CalendarClock} tone="warning" />
        <StatCard label="Departments" value={activeDepts} icon={Building2} tone="neutral" />
      </section>

      <div className={styles.columns}>
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Recent Employees</h2>
            <button className={styles.link} onClick={onViewAll}>
              View all <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
          <ul className={styles.recentList}>
            {recent.map((emp) => (
              <li key={emp.id} className={styles.recentItem}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(emp.name)}
                </span>
                <div className={styles.recentInfo}>
                  <span className={styles.recentName}>{emp.name}</span>
                  <span className={styles.recentRole}>
                    {emp.position} · {emp.department}
                  </span>
                </div>
                <StatusBadge status={emp.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>By Department</h2>
          </div>
          <ul className={styles.deptList}>
            {deptCounts.map(({ dept, count }) => (
              <li key={dept} className={styles.deptItem}>
                <div className={styles.deptTop}>
                  <span className={styles.deptName}>{dept}</span>
                  <span className={styles.deptCount}>{count}</span>
                </div>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
