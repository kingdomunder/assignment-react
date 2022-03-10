import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../../constants"
import { boardWrite } from '../../../api/BoardCommand'

function BoardWriteContainer() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleBoardWrite = async() => {
      const data = {
          title,
          content
      }
      const result = await boardWrite(data)
      if (result) {
        handleBack()
      }
  }

  const handleBack = () => {
      handleClear()
      navigate(ROUTE_PATH.boardAllView)
  }

  const handleClear = () => {
      setTitle("")
      setContent("")
  }


  return (
    <div> 
      <div>TITLE</div>
      <textarea style={{resize: "none"}}
                cols="99"
                value={title}
                onChange={e => setTitle(e.target.value)} />
      <hr />
      <div>CONTENT</div>
      <textarea style={{resize: "none"}}
                rows="30"
                cols="99"
                maxLength="50"
                spellCheck="false"
                required
                value={content} 
                onChange={e => setContent(e.target.value)} />
      <hr />
      <button onClick={handleBoardWrite}>WRITE</button>
      <br />
      <br />
      <button onClick={handleBack}>BACK</button>
    </div>
  )
}

export default BoardWriteContainer