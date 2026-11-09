import { useLogout } from "../../../hooks/mutations/userMutations/useLogout"
import "./dashboard.scss"

export function DashboardPage() {
  const { mutate: logout } = useLogout()

  return (
    <div className="dashboard-page">
      <h1>Dashboard Page</h1>
      <p>Content for dashboard.</p>

      <button className="log-out-button" onClick={() => logout()}>Log Out</button>
    </div>
  )
}