import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ADMIN_AUTH, ROUTE_PATH } from "../../constants"
import { getMemberOne, getMemberAll } from '../../api/MemberQuery'
import MemberOneContainer from './MemberSearchContainer/MemberOneContainer'
import { AdminModifyMember, AdminAuthMember, AdminDeleteMember } from '../../api/MemberCommand'
import styles from './MemberContainer.module.css'

function MemberContainer() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [memberAll, setMemberAll] = useState("")
  const [memberOne, setMemberOne] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [newName, setNewName] = useState("")
  const [isModifying, setIsModifying] = useState(false)
  const [modifyingEmail, setModifyingEmail] = useState("")

  const handleMemberAll = async() => {
    const data = await getMemberAll()
    setMemberAll(data)
    setMemberOne("")
	setIsModifying(false)
	setModifyingEmail("")
	}

  const handleMemberOne = async() => {
	const data = await getMemberOne(email)
	setMemberOne(data)
	setMemberAll("")
	setIsModifying(false)
	setModifyingEmail("")
    }
  
  const handleAdminModify = (memberEmail) => {
	  if (memberEmail) {
		  setIsModifying(true)
		  setModifyingEmail(memberEmail)
	  } else {
		  setIsModifying(false)
		  setModifyingEmail("")
	  }
	  setNewName("")
  }
  
  const handleAdminModifyConnfirm = async(memberEmail) => {
  	const data = {
  		"name" : newName,
  		"email" : memberEmail
  	}
  	const result = await AdminModifyMember(data)
  	if (result) {
		handleMemberAll()
  	}
  }
  
  const handleAdminAuth = async(memberEmail) => {
	if (window.confirm("ADMIN 권한을 부여하시겠습니까?")) {
		const data = {
			"authority" : ADMIN_AUTH,
			"email" : memberEmail
		}
		const result = await AdminAuthMember(data)
		if (result) {
			handleMemberAll()
		}
	}  
  }
  
  const handleAdminDelete = async(memberEmail) => {
  	if (window.confirm("정말 삭제하시겠습니까?")) {
  		const result = await AdminDeleteMember(memberEmail)
		if (result === '사용자가 없습니다.') {
			alert(result)
		} else {
			handleMemberAll()
		}
  	}
  }

  useEffect(() => {
	const adminAuth = localStorage.getItem(ADMIN_AUTH)
	if (adminAuth === ADMIN_AUTH) {
		setIsAdmin(true)
	}
  }, []);

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
		<hr />
        <div className={styles.memberSearchContainer}>
            {memberAll && (
              <div>
				<tr>
					<th>SEQ /</th>
					<th>EMAIL /</th>
					<th>NAME /</th>
					<th>AUTHORITY</th>
			  	</tr>
				  <hr />
				  {memberAll.map(member => (
					  <div>
						  <tr>
							  <td>{member.seq} /</td>
							  <td>{member.email} /</td>
							  <td>{member.name} /</td>
							  <td>{member.authority}</td>
						  </tr>
						  {isAdmin &&
							<div>
								{isModifying && modifyingEmail === member.email ?
									<div>
									<input type="text" 
											value={newName} 
											onChange={e => setNewName(e.target.value)}/> 
									<button onClick={() => handleAdminModifyConnfirm(member.email)}>Confirm</button> 
									<button onClick={() => handleAdminModify(false)}>취소</button> 
								</div>
								:
								<button onClick={() => handleAdminModify(member.email)}>이름수정</button> 
								}
								<button onClick={() => handleAdminAuth(member.email)}>Admin권한부여</button> 
								<button onClick={() => handleAdminDelete(member.email)}>삭제</button> 
							</div>
						  }
						  <hr />
					  </div>
					))}
              </div>
			)}
            {
                memberOne && 
                <MemberOneContainer memberOneData={memberOne}/>
            }
        </div>
    </div>
  )
}

export default MemberContainer
