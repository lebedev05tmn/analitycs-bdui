// contexts/alert-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type AlertType = "success" | "error" | "warning" | "info"

interface AlertOptions {
  title: string
  description?: string
  type?: AlertType
  duration?: number
  action?: React.ReactNode
  id?: string
}

interface Alert extends AlertOptions {
  id: string
  isVisible: boolean
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void
  hideAlert: (id: string) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider")
  }
  return context
}

const hideAlert = (
  id: string,
  setAlerts: Dispatch<SetStateAction<Alert[]>>
) => {
  setAlerts((prev) => prev.filter((alert) => alert.id !== id))
}

const showAlert = (
  options: AlertOptions,
  setAlerts: Dispatch<SetStateAction<Alert[]>>
) => {
  const id = options.id ?? Math.random().toString(36).substring(7)
  const newAlert: Alert & { duration: number } = {
    ...options,
    id,
    isVisible: true,
    type: options.type,
    duration: options.duration ?? 5000,
  }

  setAlerts((prev) => [
    ...prev.filter((alert) => alert.id !== newAlert.id),
    newAlert,
  ])

  if (newAlert.duration > 0) {
    setTimeout(() => {
      hideAlert(id, setAlerts)
    }, newAlert.duration)
  }
}

const getAlertVariant = (type: AlertType) => {
  switch (type) {
    case "success":
      return "default"
    case "error":
      return "destructive"
    case "warning":
      return "default"
    case "info":
      return "default"
    default:
      return "default"
  }
}

const getAlertStyles = (type: AlertType) => {
  switch (type) {
    case "success":
      return "border-green-500/50 bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-100"
    case "error":
      return "border-red-500/50 bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-100"
    case "warning":
      return "border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-100"
    case "info":
      return "border-blue-500/50 bg-blue-50 text-blue-900 dark:bg-blue-950/20 dark:text-blue-100"
    default:
      return ""
  }
}

const getIconStyles = (type: AlertType) => {
  switch (type) {
    case "success":
      return "text-green-600 dark:text-green-400"
    case "error":
      return "text-red-600 dark:text-red-400"
    case "warning":
      return "text-yellow-600 dark:text-yellow-400"
    case "info":
      return "text-blue-600 dark:text-blue-400"
    default:
      return ""
  }
}

const getIcon = (type: AlertType) => {
  const iconStyles = getIconStyles(type)
  switch (type) {
    case "success":
      return <CheckCircle className={`h-5 w-5 ${iconStyles}`} />
    case "error":
      return <XCircle className={`h-5 w-5 ${iconStyles}`} />
    case "warning":
      return <AlertCircle className={`h-5 w-5 ${iconStyles}`} />
    case "info":
      return <Info className={`h-5 w-5 ${iconStyles}`} />
  }
}

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  return (
    <AlertContext.Provider
      value={{
        showAlert: (options) => showAlert(options, setAlerts),
        hideAlert: (options) => hideAlert(options, setAlerts),
      }}
    >
      {children}

      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-50 flex max-w-md flex-col gap-2">
        {alerts.map(
          ({ type, id, title, description, action, duration = 0 }) => (
            <div
              key={id}
              className="relative animate-in duration-300 slide-in-from-top-2"
            >
              <Alert
                variant={type ? getAlertVariant(type) : "default"}
                className={`${type ? getAlertStyles(type) : ""} relative overflow-hidden`}
              >
                <div className="flex items-start gap-3">
                  {type && getIcon(type)}

                  <div className="min-w-0 flex-1">
                    <AlertTitle className="mb-1 font-semibold">
                      {title}
                    </AlertTitle>
                    {description && (
                      <AlertDescription className="text-sm opacity-90">
                        {description}
                      </AlertDescription>
                    )}
                    {action && <div className="mt-2">{action}</div>}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 hover:bg-transparent"
                    onClick={() => hideAlert(id, setAlerts)}
                  >
                    <XCircle className="h-4 w-4 opacity-70 hover:opacity-100" />
                  </Button>
                </div>

                {/* Progress bar */}
                {duration > 0 && (
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20"
                    style={{
                      width: "100%",
                      animation: `shrink ${duration}ms linear forwards`,
                    }}
                  />
                )}
              </Alert>
            </div>
          )
        )}
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </AlertContext.Provider>
  )
}

export default AlertProvider
