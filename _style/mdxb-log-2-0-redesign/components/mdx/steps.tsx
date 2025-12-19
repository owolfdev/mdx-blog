import type React from "react"

interface StepsProps {
  children: React.ReactNode
}

interface StepProps {
  title: string
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return <div className="my-8 space-y-6">{children}</div>
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative pl-8 border-l-2 border-accent pb-6 last:pb-0">
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-accent" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </div>
  )
}
