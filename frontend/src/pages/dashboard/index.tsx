import CmsDashboard from "@/components/CmsDashboard"
import useAuth from "@/hooks/useAuth"

function Dashboard (){
  const { render } = useAuth('any', '/login')

  return render && (
    <div>
      <CmsDashboard>
        User Bienvenido 
      </CmsDashboard>
    </div>
  )
}

export default Dashboard
