import type React from "react"
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success"
  children: React.ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-100",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-900 dark:text-yellow-100",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-100",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-100",
  },
}

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border p-4", config.className)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1 leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  )
}
