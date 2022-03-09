import { SERVER_URL } from "../../../constants"

function MainContents() {
  const test = () => {
    console.log(SERVER_URL)
    // console.log(process.env.REACT_APP_TEST)
  }

  return (
    <div>
        <h3>메인페이지 컨텐츠</h3>
        <button onClick={test}>test</button>
    </div>
  )
}

export default MainContents
