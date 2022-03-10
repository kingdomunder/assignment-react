import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../../constants"

function AdminContainer() {

  const navigate = useNavigate()

  return (
    <div> 
      AdminContainer
      <br />
      <button onClick={() => navigate(ROUTE_PATH.member)}>BACK</button>
    </div>
  )
}

export default AdminContainer
