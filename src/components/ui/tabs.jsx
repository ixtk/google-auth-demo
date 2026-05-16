import { createContext, useContext, useState } from 'react'
import { cn } from "@/lib/utils"

const TabsContext = createContext()

const Tabs = ({ value, onValueChange, children, ...props }) => {
  const [internalValue, setInternalValue] = useState(value || '')
  
  const currentValue = value !== undefined ? value : internalValue
  const handleValueChange = onValueChange || setInternalValue

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, ...props }) => {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1",
        className
      )}
      {...props}
    />
  )
}

const TabsTrigger = ({ value, className, ...props }) => {
  const { value: activeValue, onValueChange } = useContext(TabsContext)
  const isActive = activeValue === value

  return (
    <button
      role="tab"
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

const TabsContent = ({ value, className, ...props }) => {
  const { value: activeValue } = useContext(TabsContext)
  
  if (activeValue !== value) return null

  return (
    <div
      role="tabpanel"
      className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
