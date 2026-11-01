import { useTheme } from "../../../../hooks/contexts/useTheme"

export default function DarkLightModeButton() {
  const themeContext = useTheme()

  const handleClick = () =>
    themeContext.setTheme(p => p == "light" ? "dark" : "light")

  return (
    <button
      onClick={handleClick}
      title={themeContext.theme + " mode"}
      className="button-t1 d-l-button dark-light-button">
      {themeContext.theme == "light"
        ? <i className="moon fa-solid fa-sun"></i>
        : <i className="sun fa-solid fa-moon"></i>}
    </button>
  )
}