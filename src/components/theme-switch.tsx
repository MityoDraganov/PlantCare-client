import { Moon, Sun } from "lucide-react"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
<Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} size="icon" variant="outline">{theme === "light" ? <Sun /> : <Moon />}</Button>
  )
}