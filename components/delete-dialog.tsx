"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import type { Employee } from "@/lib/types"
import styles from "./delete-dialog.module.css"

interface DeleteDialogProps {
  employee: Employee | null
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteDialog({ employee, onCancel, onConfirm }: DeleteDialogProps) {
  useEffect(() => {
    if (!employee) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [employee, onCancel])

  if (!employee) return null

  return (
    <div className={styles.overlay} onMouseDown={onCancel}>
      <div
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.icon} aria-hidden="true">
          <AlertTriangle size={26} />
        </div>
        <h2 id="delete-title" className={styles.title}>
          Delete employee?
        </h2>
        <p id="delete-desc" className={styles.desc}>
          Are you sure you want to remove <strong>{employee.name}</strong>? This
          action cannot be undone.
        </p>
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
