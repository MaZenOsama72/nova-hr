"use client"

import { useState } from "react"
import { Sidebar, type View } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardView } from "@/components/dashboard-view"
import { EmployeesView } from "@/components/employees-view"
import { DepartmentsView } from "@/components/departments-view"
import { SettingsView } from "@/components/settings-view"
import { EmployeeModal } from "@/components/employee-modal"
import { DeleteDialog } from "@/components/delete-dialog"
import { useEmployees } from "@/lib/use-employees"
import type { Employee } from "@/lib/types"
import styles from "./page.module.css"

const VIEW_META: Record<View, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "An overview of your workforce at a glance.",
  },
  employees: {
    title: "Employees",
    subtitle: "Manage, search, and filter your team members.",
  },
  departments: {
    title: "Departments",
    subtitle: "Explore headcount across your organization.",
  },
  settings: {
    title: "Settings",
    subtitle: "Configure your workspace preferences.",
  },
}

export default function Page() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    resetEmployees,
  } = useEmployees()

  const [view, setView] = useState<View>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [initialDept, setInitialDept] = useState("All")

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)

  function navigate(next: View) {
    setView(next)
    setSidebarOpen(false)
    if (next !== "employees") setInitialDept("All")
  }

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(employee: Employee) {
    setEditing(employee)
    setModalOpen(true)
  }

  function handleSubmit(data: Omit<Employee, "id">) {
    if (editing) {
      updateEmployee(editing.id, data)
    } else {
      addEmployee(data)
    }
    setModalOpen(false)
    setEditing(null)
  }

  function confirmDelete() {
    if (deleteTarget) deleteEmployee(deleteTarget.id)
    setDeleteTarget(null)
  }

  function openDepartment(dept: string) {
    setInitialDept(dept)
    setView("employees")
  }

  const meta = VIEW_META[view]

  return (
    <div className={styles.shell}>
      <Sidebar
        active={view}
        onNavigate={navigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.main}>
        <Header title="NOVA HR" onMenuClick={() => setSidebarOpen(true)} />

        <main className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.viewHeader}>
              <h2 className={styles.viewTitle}>{meta.title}</h2>
              <p className={styles.viewSubtitle}>{meta.subtitle}</p>
            </div>

            {view === "dashboard" && (
              <DashboardView
                employees={employees}
                onViewAll={() => navigate("employees")}
              />
            )}

            {view === "employees" && (
              <EmployeesView
                key={initialDept}
                employees={employees}
                initialDepartment={initialDept}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            )}

            {view === "departments" && (
              <DepartmentsView
                employees={employees}
                onOpenDepartment={openDepartment}
              />
            )}

            {view === "settings" && (
              <SettingsView onResetData={resetEmployees} />
            )}
          </div>
        </main>
      </div>

      <EmployeeModal
        open={modalOpen}
        employee={editing}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
      />

      <DeleteDialog
        employee={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
