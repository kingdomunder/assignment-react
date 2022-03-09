import { authCheck } from "../../../api/AuthQuery"

function MainContents() {

  const handleCheck = () => {
    authCheck()
  }

  return (
    <div>
        <h3>메인페이지 컨텐츠</h3>
        <button onClick={handleCheck}>token check</button>
    </div>
  )
}

export default MainContents
