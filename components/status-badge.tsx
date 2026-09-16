import type { EmployeeStatus } from "@/lib/types"
import styles from "./status-badge.module.css"

const TONE: Record<EmployeeStatus, string> = {
  Active: styles.active,
  "On Leave": styles.leave,
  Inactive: styles.inactive,
}

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  return (
    <span className={`${styles.badge} ${TONE[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status}
    </span>
  )
}
