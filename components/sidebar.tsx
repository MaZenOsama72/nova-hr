"use client"

import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  X,
} from "lucide-react"
import styles from "./sidebar.module.css"

export type View = "dashboard" | "employees" | "departments" | "settings"

const NAV_ITEMS: { id: View; label: string; icon: typeof Users }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Employees", icon: Users },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  active: View
  onNavigate: (view: View) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.brandRow}>
          <div className={styles.brand}>
            <span className={styles.logoMark} aria-hidden="true">
              N
            </span>
            <span className={styles.brandName}>
              NOVA<span className={styles.brandAccent}>HR</span>
            </span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userCard}>
            <span className={styles.avatar} aria-hidden="true">
              JD
            </span>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Jamie Doe</span>
              <span className={styles.userRole}>HR Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
