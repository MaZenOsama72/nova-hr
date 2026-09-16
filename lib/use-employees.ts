"use client"

import { useCallback, useEffect, useState } from "react"
import type { Employee } from "./types"
import { SAMPLE_EMPLOYEES } from "./data"

const STORAGE_KEY = "nova-hr-employees"

function loadEmployees(): Employee[] {
  if (typeof window === "undefined") return SAMPLE_EMPLOYEES
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return SAMPLE_EMPLOYEES
    const parsed = JSON.parse(raw) as Employee[]
    if (!Array.isArray(parsed)) return SAMPLE_EMPLOYEES
    return parsed
  } catch {
    return SAMPLE_EMPLOYEES
  }
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setEmployees(loadEmployees())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    } catch {
      // ignore write errors (e.g. storage full / disabled)
    }
  }, [employees, hydrated])

  const addEmployee = useCallback((data: Omit<Employee, "id">) => {
    setEmployees((prev) => [
      { ...data, id: `emp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
      ...prev,
    ])
  }, [])

  const updateEmployee = useCallback((id: string, data: Omit<Employee, "id">) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...data, id } : e)))
  }, [])

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const resetEmployees = useCallback(() => {
    setEmployees(SAMPLE_EMPLOYEES)
  }, [])

  return {
    employees,
    hydrated,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    resetEmployees,
  }
}
