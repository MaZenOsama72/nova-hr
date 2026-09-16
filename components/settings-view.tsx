"use client"

import { RotateCcw, Database } from "lucide-react"
import styles from "./settings-view.module.css"

interface SettingsViewProps {
  onResetData: () => void
}

export function SettingsView({ onResetData }: SettingsViewProps) {
  return (
    <div className={styles.wrap}>
      <section className={styles.panel}>
        <h2 className={styles.title}>Organization</h2>
        <p className={styles.subtitle}>Basic details for your workspace.</p>
        <div className={styles.field}>
          <label htmlFor="org-name">Company name</label>
          <input id="org-name" type="text" defaultValue="NOVA HR" />
        </div>
        <div className={styles.field}>
          <label htmlFor="org-email">Contact email</label>
          <input id="org-email" type="email" defaultValue="hr@novahr.com" />
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.dangerHead}>
          <div className={styles.dangerIcon} aria-hidden="true">
            <Database size={20} />
          </div>
          <div>
            <h2 className={styles.title}>Data</h2>
            <p className={styles.subtitle}>
              Employee records are stored locally in your browser.
            </p>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={onResetData}>
          <RotateCcw size={16} aria-hidden="true" /> Reset to sample data
        </button>
      </section>
    </div>
  )
}
