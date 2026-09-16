"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { DEPARTMENTS, STATUSES, type Employee } from "@/lib/types"
import styles from "./employee-modal.module.css"

interface EmployeeModalProps {
  open: boolean
  employee: Employee | null
  onClose: () => void
  onSubmit: (data: Omit<Employee, "id">) => void
}

type FormState = Omit<Employee, "id">
type Errors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  department: DEPARTMENTS[0],
  position: "",
  status: "Active",
}

export function EmployeeModal({
  open,
  employee,
  onClose,
  onSubmit,
}: EmployeeModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setErrors({})
    if (employee) {
      const { id: _id, ...rest } = employee
      setForm(rest)
    } else {
      setForm(EMPTY)
    }
  }, [open, employee])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Errors = {}
    if (!form.name.trim()) next.name = "Full name is required."
    if (!form.email.trim()) {
      next.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address."
    }
    if (!form.phone.trim()) next.phone = "Phone is required."
    if (!form.position.trim()) next.position = "Position is required."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      department: form.department,
      position: form.position.trim(),
      status: form.status,
    })
  }

  const isEdit = Boolean(employee)

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <div>
            <h2 id="modal-title" className={styles.title}>
              {isEdit ? "Edit Employee" : "Add Employee"}
            </h2>
            <p className={styles.subtitle}>
              {isEdit
                ? "Update the employee details below."
                : "Fill in the details to add a new team member."}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="f-name">Full Name</label>
            <input
              id="f-name"
              ref={firstFieldRef}
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={errors.name ? styles.inputError : ""}
              placeholder="e.g. Ahmed Ali"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="f-email">Email</label>
              <input
                id="f-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={errors.email ? styles.inputError : ""}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="f-phone">Phone</label>
              <input
                id="f-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                className={errors.phone ? styles.inputError : ""}
                placeholder="+20 100 000 0000"
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="f-dept">Department</label>
              <select
                id="f-dept"
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
                className={styles.select}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="f-status">Status</label>
              <select
                id="f-status"
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as FormState["status"])
                }
                className={styles.select}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="f-position">Position</label>
            <input
              id="f-position"
              type="text"
              value={form.position}
              onChange={(e) => update("position", e.target.value)}
              aria-invalid={Boolean(errors.position)}
              className={errors.position ? styles.inputError : ""}
              placeholder="e.g. Frontend Developer"
            />
            {errors.position && (
              <span className={styles.error}>{errors.position}</span>
            )}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
