import { getBoardAll } from "../../api/BoardQuery"

function BoardAllContainer() {

    const handleBoardAll = () => {
        getBoardAll()
    }

  return (
    <div> 
        <button onClick={handleBoardAll}>get board all</button>
    </div>
  )
}

export default BoardAllContainer
