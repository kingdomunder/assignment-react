import { useNavigate } from 'react-router';
import { useEffect, useState } from "react"
import { ROUTE_PATH } from '../../constants';
import { getBoardAll, getBoardOne } from "../../api/BoardQuery"

function BoardAllContainer() {

    const navigate = useNavigate()

    const [boardData, setBoardData] = useState("")

    const handleBoardOne = async(seq) => {
      const result = await getBoardOne(seq)
      if (result) {
        navigate(ROUTE_PATH.boardOneView)
      }
    }

    useEffect(async() => {
      const data = await getBoardAll()
      setBoardData(data)
    },[])
    
  return (
    <div> 
      <table>
        {boardData.length != 0 && 
          <div>
            <tr>
              <th>SEQ</th>
              <th>TITLE</th>
              <th>EMAIL</th>
              <th>VIEW</th>
            </tr>  
            {boardData.list.map(board =>
              <tr onClick={() => handleBoardOne(board.seq)}>
                <td>{board.seq}</td>
                <td>{board.title}</td>
                <td>{board.memberEmail}</td>
                <td>{board.viewCount}</td>
              </tr>  
            )}
          </div>
        }
      </table> 
      <hr />
      <button
          onClick={() => navigate(ROUTE_PATH.boardWrite)}>Write</button>       
    </div>
  )
}

export default BoardAllContainer
