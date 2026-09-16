import { UserX } from "lucide-react"
import styles from "./empty-state.module.css"

interface EmptyStateProps {
  title?: string
  message?: string
}

export function EmptyState({
  title = "No employees found",
  message = "Try adjusting your search or filters to find what you're looking for.",
}: EmptyStateProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon} aria-hidden="true">
        <UserX size={30} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
