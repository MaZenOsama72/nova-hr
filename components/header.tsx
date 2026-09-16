"use client"

import { Menu, Bell, Search } from "lucide-react"
import styles from "./header.module.css"

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
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

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Search">
          <Search size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.dot} aria-hidden="true" />
        </button>
        <span className={styles.avatar} aria-hidden="true">
          JD
        </span>
      </div>
    </header>
  )
}
