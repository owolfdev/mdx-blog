"use client"

import * as React from "react"

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}

interface TabProps {
  value: string
  label: string
  children: React.ReactNode
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> => React.isValidElement(child) && child.type === Tab,
  )

  return (
    <div className="my-6">
      <div className="flex gap-2 border-b border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.props.value}
            onClick={() => setActiveTab(tab.props.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.props.value
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div key={tab.props.value} className={activeTab === tab.props.value ? "block" : "hidden"}>
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Tab({ value, label, children }: TabProps) {
  return <>{children}</>
}
