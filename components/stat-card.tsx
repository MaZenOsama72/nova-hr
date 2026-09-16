"use client"

import type { LucideIcon } from "lucide-react"
import styles from "./stat-card.module.css"

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  tone: "primary" | "success" | "warning" | "neutral"
  hint?: string
}

export function StatCard({ label, value, icon: Icon, tone, hint }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrap} ${styles[tone]}`}>
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </div>
    </div>
  )
}
