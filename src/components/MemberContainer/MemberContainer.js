import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../constants"
import { getMemberOne, getMemberAll } from '../../api/MemberQuery'
import MemberAllContainer from './MemberSearchContainer/MemberAllContainer'
import MemberOneContainer from './MemberSearchContainer/MemberOneContainer'

function MemberContainer() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [memberAll, setMemberAll] = useState("")
  const [memberOne, setMemberOne] = useState("")

  const handleMemberAll = async() => {
    const data = await getMemberAll(navigate)
    setMemberAll(data)
    setMemberOne("")
}

const handleMemberOne = async() => {
    const data = await getMemberOne(navigate, email)
    setMemberOne(data)
    setMemberAll("")
  }

  return (
    <div> 
        <div>
            <label>
            Email로 검색
            </label>
            <input type="text"
                   value={email}
                   onChange={e => setEmail(e.target.value)} />
        <button onClick={handleMemberOne}>검색</button>
        </div>
        <div>
            <button onClick={handleMemberAll}>전체 검색</button>
        </div>
        <div>
            {
                memberAll &&
                <MemberAllContainer memberAllData={memberAll}/>
            }
            {
                memberOne && 
                <MemberOneContainer memberOneData={memberOne}/>
            }
        </div>
      <hr />
      <button onClick={() => navigate(ROUTE_PATH.admin)}>ADMIN</button>
    </div>
  )
}

export default MemberContainer
