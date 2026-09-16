"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Menu, Bell, Search, Sun, Moon, X, Check } from "lucide-react"
import type { Employee } from "@/lib/types"
import type { Theme } from "@/lib/use-theme"
import styles from "./header.module.css"

interface NotificationItem {
  id: string
  title: string
  detail: string
  time: string
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "New hire onboarding",
    detail: "Sara Youssef joins the Design team on Monday.",
    time: "2h ago",
  },
  {
    id: "n2",
    title: "Leave request",
    detail: "Omar Hassan requested 3 days of annual leave.",
    time: "5h ago",
  },
  {
    id: "n3",
    title: "Performance reviews",
    detail: "Q3 reviews are due by the end of the week.",
    time: "1d ago",
  },
]

interface HeaderProps {
  title: string
  onMenuClick: () => void
  employees: Employee[]
  onSearchSelect: (query: string) => void
  theme: Theme
  onToggleTheme: () => void
}

export function Header({
  title,
  onMenuClick,
  employees,
  onSearchSelect,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [dismissed, setDismissed] = useState<string[]>([])

  const searchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  const notifications = NOTIFICATIONS.filter((n) => !dismissed.includes(n.id))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return employees
      .filter(
        (emp) =>
          emp.name.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q) ||
          emp.position.toLowerCase().includes(q),
      )
      .slice(0, 6)
  }, [employees, query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  function submitSearch(value: string) {
    const v = value.trim()
    if (!v) return
    onSearchSelect(v)
    setQuery("")
    setSearchOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.searchWrap} ref={searchRef}>
        <form
          className={styles.searchForm}
          onSubmit={(e) => {
            e.preventDefault()
            submitSearch(query)
          }}
          role="search"
        >
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search employees..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            aria-label="Search employees"
          />
          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setQuery("")
                setSearchOpen(false)
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </form>

        {searchOpen && query.trim() && (
          <div className={styles.dropdown} role="listbox">
            {results.length === 0 ? (
              <p className={styles.noResults}>
                No matches for &ldquo;{query.trim()}&rdquo;
              </p>
            ) : (
              results.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  className={styles.resultItem}
                  onClick={() => submitSearch(emp.name)}
                >
                  <span className={styles.resultAvatar} aria-hidden="true">
                    {emp.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className={styles.resultText}>
                    <span className={styles.resultName}>{emp.name}</span>
                    <span className={styles.resultMeta}>
                      {emp.position} &middot; {emp.department}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.right}>
        <button
          className={styles.iconBtn}
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className={styles.notifWrap} ref={notifRef}>
          <button
            className={styles.iconBtn}
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {notifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className={styles.dropdown} role="menu">
              <div className={styles.notifHead}>
                <span>Notifications</span>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    className={styles.markAll}
                    onClick={() => setDismissed(NOTIFICATIONS.map((n) => n.id))}
                  >
                    <Check size={14} /> Mark all read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className={styles.noResults}>You&apos;re all caught up.</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className={styles.notifItem}>
                    <span className={styles.notifDot} aria-hidden="true" />
                    <span className={styles.notifText}>
                      <span className={styles.notifTitle}>{n.title}</span>
                      <span className={styles.notifDetail}>{n.detail}</span>
                      <span className={styles.notifTime}>{n.time}</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <span className={styles.avatar} aria-hidden="true">
          JD
        </span>
      </div>
    </header>
  )
}
