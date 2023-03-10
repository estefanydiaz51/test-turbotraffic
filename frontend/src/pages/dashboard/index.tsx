import CmsDashboard from "@/components/CmsDashboard"
import useAuth from "@/hooks/useAuth"

function Dashboard (){
  const { render } = useAuth('any', '/login')

  return render && (
    <div>
      <CmsDashboard>
        <h1>User Bienvenido</h1>
      </CmsDashboard>
    </div>
  )
}

export default Dashboard
