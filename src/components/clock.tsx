"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/Belgrade",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="fixed top-3 right-4 z-[60] hidden md:block text-right leading-tight">
      <p className="text-xs font-mono tabular-nums text-muted-foreground">{time}</p>
      <p className="text-[10px] text-muted-foreground/50">Pančevo</p>
    </div>
  )
}
