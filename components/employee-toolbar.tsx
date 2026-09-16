"use client"

import { Search } from "lucide-react"
import { DEPARTMENTS, type EmployeeStatus } from "@/lib/types"
import styles from "./employee-toolbar.module.css"

export type StatusFilter = "All" | EmployeeStatus

const STATUS_TABS: StatusFilter[] = ["All", "Active", "On Leave", "Inactive"]

interface ToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  department: string
  onDepartmentChange: (value: string) => void
}

export function EmployeeToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  department,
  onDepartmentChange,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            className={styles.search}
            placeholder="Search by name, email, department, position..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search employees"
          />
        </div>

        <div className={styles.deptWrap}>
          <label htmlFor="dept-filter" className={styles.srOnly}>
            Filter by department
          </label>
          <select
            id="dept-filter"
            className={styles.select}
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Filter by status">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={status === tab}
            className={`${styles.tab} ${status === tab ? styles.tabActive : ""}`}
            onClick={() => onStatusChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
